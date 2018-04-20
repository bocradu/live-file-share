const path = require("path");
const { app, ipcMain, clipboard, globalShortcut, shell } = require("electron");
const { FileShareTray } = require("./App/FileShareTray");
const { MainWindow } = require("./App/MainWindow");
const uuidv4 = require("uuid/v4");
const _ = require("lodash");
const { FileApi, Options, Files } = require("./fileApi");
const { ClientApi, HostApi } = require("./socketApi");
const id = uuidv4();
let mainWindow;
let tray;
app.on("ready", () => {
  mainWindow = new MainWindow();
  mainWindow.init();
  const isWin = process.platform === "win32";
  const iconName = isWin ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./Ui/assets/${iconName}`);
  tray = new FileShareTray(iconPath, mainWindow);
});
app.on("closed", () => {
  mainWindow = null;
  tray = null;
});
ipcMain.on("log", (event, message) => {
  console.log(message);
});

ipcMain.on("hide", () => {
  mainWindow.hide();
});
ipcMain.on("copy", (event, data) => {
  clipboard.writeText(data);
});
ipcMain.on("open-file-client", (event, name) => {
  shell.openItem(`${Options.downloadPath}/${name}`);
});
ipcMain.on("open-folder-client", () => {
  shell.openItem(Options.downloadPath);
});
ipcMain.on("open-file-host", (event, path) => {
  shell.openItem(path);
});
ipcMain.on("open-folder-host", (event, path) => {
  shell.openItem(require("path").dirname(path));
});
ipcMain.on("settings:save", (event, options) => {
  Options.downloadPath = options.downloadPath;
});
ipcMain.on("settings:get", () => {});
ipcMain.on("host:register", () => {
  HostApi.register(id);
  mainWindow.webContents.send("host:register", id);
});
ipcMain.on("host:shareFile", (event, sharedFiles) => {
  FileApi.closeWatchAll("Host");
  Files.Host = sharedFiles;
  HostApi.share({ id, sharedFiles: Files.Host });
  _.forEach(Files.Host, (file, fileId) => {
    FileApi.watch(
      { fileId, path: file.path, type: "Host" },
      ({ fileId, path }) => {
        FileApi.read(path).then(data => {
          HostApi.onLocalChange({ id, fileId, file: data });
        });
      }
    );
  });
});
ipcMain.on("host:removeFile", (event, fileId) => {
  HostApi.removeFile({ id, fileId });
  FileApi.closeWatch({ id: fileId, type: "Host" });
});
ipcMain.on("host:stop", () => {
  HostApi.disconnect(id);
  FileApi.closeWatchAll("Host");
});
HostApi.onDownload(({ id, clientId, fileId }) => {
  FileApi.read(Files.Host[fileId].path).then(data => {
    HostApi.download({ id, clientId, fileId, file: data });
  });
});
HostApi.onRemoteChange(({ fileId, file }) => {
  const { path } = Files.Host[fileId];
  FileApi.closeWatch({ id: fileId, type: "Host" });
  FileApi.save({ path, file }).then(() => {
    FileApi.watch({ fileId, path, type: "Host" }, ({ fileId, path }) => {
      FileApi.read(path).then(data => {
        HostApi.onLocalChange({ id, fileId, file: data });
      });
    });
  });
});

ipcMain.on("client:connect", (event, hostId) => {
  ClientApi.subscribe({ id: hostId, clientId: id });
});
ipcMain.on("client:disconnect", (event, hostId) => {
  ClientApi.disconnect({ id: hostId, clientId: id });
  FileApi.closeWatchAll("Client");
});
ipcMain.on("client:download", (event, { hostId, fileId }) => {
  ClientApi.download({ id: hostId, clientId: id, fileId });
});

ClientApi.onDownload(({ id, fileId, file }) => {
  const path = `${Options.downloadPath}/${Files.Client[id][fileId].name}`;
  FileApi.save({
    path,
    file
  }).then(() => {
    mainWindow.webContents.send("client:download", { id, fileId });
    FileApi.watch({ fileId, path, type: "Client" }, ({ fileId, path }) => {
      FileApi.read(path).then(data => {
        ClientApi.onLocalChange({ id, fileId, file: data });
      });
    });
  });
});
ClientApi.onRemoteChange(({ id, fileId, file }) => {
  const path = `${Options.downloadPath}/${Files.Client[id][fileId].name}`;
  FileApi.closeWatch({ id: fileId, type: "Client" });
  FileApi.save({
    path,
    file
  }).then(() => {
    FileApi.watch({ fileId, path, type: "Client" }, ({ fileId, path }) => {
      FileApi.read(path).then(data => {
        ClientApi.onLocalChange({ id, fileId, file: data });
      });
    });
  });
});
ClientApi.onSendFileList(({ id, files }) => {
  Files.Client[id] = files;
  FileApi.checkFiles({ files, type: "Client" });
  FileApi.closeWatchAll("Client");
  mainWindow.webContents.send("client:connect", { id, files });
});

var io = require("socket.io-client");
const _ = require("lodash");
const serverIp = "http://52.143.143.186:5000/";
// const serverIp = process.env.SERVER || "http://172.18.20.80:5000";
console.log(serverIp);
const serverSocket = io(serverIp);
serverSocket
  .on("error", function(error) {
    console.log(error);
  })
  .on("connect_error", function(error) {
    console.log(error);
  });
const HostApi = {
  register: id => {
    serverSocket.emit("host:register", id);
  },
  share: ({ id, sharedFiles }) => {
    serverSocket.emit("host:addFiles", { id, sharedFiles });
  },
  removeFile: ({ id, fileId }) => {
    serverSocket.emit("host:removeFile", { id, fileId });
  },
  download: ({ id, clientId, fileId, file }) => {
    serverSocket.emit("host:download", { id, clientId, fileId, file });
  },
  disconnect: id => {
    serverSocket.emit("host:register", id);
  },
  onLocalChange: ({ id, fileId, file }) => {
    serverSocket.emit("host:changed", { id, fileId, file });
  },
  onDownload: cb => {
    serverSocket.on("host:download", ({ id, clientId, fileId }) => {
      cb({ id, clientId, fileId });
    });
  },
  onRemoteChange: cb => {
    serverSocket.on("host:changed", ({ fileId, file }) => {
      cb({ fileId, file });
    });
  }
};

const ClientApi = {
  subscribe: ({ id, clientId }) => {
    serverSocket.emit("client:subscribe", { id, clientId });
  },
  download: ({ id, clientId, fileId }) => {
    serverSocket.emit("client:download", { id, clientId, fileId });
  },
  disconnect: ({ id, clientId }) => {
    serverSocket.emit("client:register", { id, clientId });
  },
  onLocalChange: ({ id, fileId, file }) => {
    serverSocket.emit("client:changed", { id, fileId, file });
  },
  onSendFileList: cb => {
    serverSocket.on("client:sendFileList", ({ id, files }) => {
      cb({ id, files });
    });
  },
  onSubscribed: cb => {
    serverSocket.on("client:subscribe", ({ id, files }) => {
      cb({ id, files });
    });
  },
  onDownload: cb => {
    serverSocket.on("client:download", ({ id, fileId, file }) => {
      cb({
        id,
        fileId,
        file
      });
    });
  },
  onRemoteChange: cb => {
    serverSocket.on("client:changed", ({ id, fileId, file }) => {
      cb({ id, fileId, file });
    });
  },
  onRemoveFile: cb => {
    serverSocket.on("client:removeFile", ({ id, fileId }) => {
      cb({ id, fileId });
    });
  }
};

module.exports = { ClientApi, HostApi };

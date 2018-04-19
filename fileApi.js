var fs = require("fs");
const uuidv4 = require("uuid/v4");
const _ = require("lodash");
const fileWatchers = {
  Client: {},
  Host: {}
};
const Options = {
  downloadPath: "D:"
};
const Files = {
  Client: {},
  Host: {}
};
const FileApi = {
  watch: ({ fileId, path, type }, cb) => {
    const watcher = fs.watch(path, event => {
      if (event === "change") {
        cb({ fileId, path });
      }
    });
    fileWatchers[type][fileId] = watcher;
  },
  closeWatch: ({ id, type }) => {
    if (fileWatchers[type][id]) {
      fileWatchers[type][id].close();
      delete fileWatchers[type][id];
    }
  },
  closeWatchAll: type => {
    _.forEach(fileWatchers[type], (watch, id) => {
      watch.close();
      delete fileWatchers[type][id];
    });
  },
  save: ({ path, file }) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, file, err => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve();
      });
    });
  },
  read: path => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
          const error = "An error ocurred reading the file :" + err.message;
          console.log(error);
          reject(error);
        }
        resolve(data);
      });
    });
  },
  checkFiles: ({ type, files }) => {
    _.forEach(fileWatchers[type], (value, key) => {
      if (!files[key]) {
        value.close();
        delete fileWatchers[type][key];
      }
    });
  }
};
module.exports = { FileApi, Options, Files };

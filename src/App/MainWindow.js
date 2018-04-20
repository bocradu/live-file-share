const { BrowserWindow } = require("electron");
class MainWindow extends BrowserWindow {
  constructor() {
    super({
      height: 600,
      width: 800,
      frame: false,
      resizable: false,
      show: false,
      webPreferences: { backgroundThrottling: false }
    });
    //this.on("blur", this.hide);
  }
  init() {
    this.loadURL(`file://${__dirname}/../Ui/index.html`);
  }
}

module.exports = { MainWindow };

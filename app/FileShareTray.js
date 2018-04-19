const { app, Tray, Menu } = require("electron");
class FileShareTray extends Tray {
  constructor(icon, mainWindow) {
    super(icon);
    this.mainWindow = mainWindow;
    this.setToolTip("File Share");
    this.on("click", this.onClick.bind(this));
    this.on("right-click", this.onRightClick.bind(this));
  }
  onClick(event, bounds) {
    const isWin = process.platform === "win32";
    const { x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPosition = isWin ? y - height : y;
      const newBounds = {
        x: (x - width * (2 / 3)) | 0,
        y: yPosition,
        height,
        width
      };
      this.mainWindow.setBounds(newBounds);
      this.mainWindow.show();
    }
  }
  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => app.quit()
      }
    ]);
    this.popUpContextMenu(menuConfig);
  }
}

module.exports = { FileShareTray };

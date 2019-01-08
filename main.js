// 引入electron并创建一个Browserwindow
const electron = require('electron')
const {app, BrowserWindow, globalShortcut, Tray, Menu, ipcMain } = electron
const path = require('path')
const url = require('url')

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

function createWindow () {
  //创建浏览器窗口,宽高自定义具体大小你开心就好
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width: 600, 
    height: 55,
    y:250,
    x:(width-600)/2,
    frame: false, 
    resizable: false, 
    skipTaskbar: true,
    opacity:0.9,
    backgroundColor:'#717274'
  })

  const trayMenuTemplate = [
    {
      label: '配置',
      click: function () {
        mainWindow.webContents.send('main-process-href', 'config');
        mainWindow.setSize(600,500);
        mainWindow.center();
        mainWindow.show();
      }
    },
    {
      label: '退出',
      click: function () {
        app.quit();
          app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      }
    }
  ];

  appTray = new Tray(path.join(__dirname, 'public/favicon.png'));//app.ico是app目录下的ico文件

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip('quickly');

  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  //单击右下角小图标显示应用
  appTray.on('click',function(){
      mainWindow.show();
  })

  /* 
   * 加载应用-----  electron-quick-start中默认的加载入口
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  */
  // 加载应用----适用于 react 项目
  if(process.env.NODE_ENV === 'development'){
    mainWindow.loadURL('http://localhost:3000/');
    // 打开开发者工具，默认不打开
    mainWindow.webContents.openDevTools()
  }else{
  // 加载应用----react 打包
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.on('blur',()=>{
    //mainWindow.minimize()
  })
  
  ipcMain.on('asynchronous-message', (event, arg) => {
    if(arg === 'home'){
      mainWindow.setMinimumSize(600,55);
      mainWindow.setSize(600,55);
      mainWindow.setPosition((width-600)/2,250);
      mainWindow.webContents.send('main-process-href', 'home');
    }
  })

  globalShortcut.register('CommandOrControl+Space', () => {
    mainWindow.setMinimumSize(600,55);
    mainWindow.setSize(600,55);
    mainWindow.setPosition((width-600)/2,250);
    mainWindow.webContents.send('main-process-href', 'home');
    mainWindow.show();
    mainWindow.moveTop();
  })
}

/**
* 实例检测
*/
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
  app.on('ready', createWindow)

  // 所有窗口关闭时退出应用.
  app.on('window-all-closed', function () {
    // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    if (mainWindow === null) {
      createWindow()
    }
  })
}
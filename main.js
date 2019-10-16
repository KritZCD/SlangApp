const {app,BrowserWindow,Menu} = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const ipc = require('electron').ipcMain
const ipcRend = require('electron').ipcRenderer
const remote = require('electron').remote;


//SET ENV
//process.env.NODE_ENV = 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
//let wordArr
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600,focusable: true,frame:true,resizable:false})
  win.setResizable(false)
  // and load the index.html of the app.
  win.loadFile('src/main_window/index.html')
  win.setMenuBarVisibility(true);
  // Open the DevTools.
 // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null

  })
  win.on('close', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win.webContents.send('saveApp')
    app.quit()
  })



  win.setMenu(menu);
}

let menu = Menu.buildFromTemplate([
    {
        label:'Menu',
        submenu:[
            //{label: 'Settings'}, TODO:Add settings
            {label: 'Refresh',click(){win.webContents.reload()}},
            {type:'separator'},
            //{label: 'Minimize',click(){app.hide()}},
            {label: 'Exit', click(){app.quit()}}
        ]
    },
    {
        label:'Word Options',
        submenu:[
            {label: 'Add a Slang word',click(){
               let Addwin = new BrowserWindow({width:425, height:200, transparent:true,frame: false})

                Addwin.loadFile('src/WordOptions/AddWindow/index.html')
                //Addwin.webContents.openDevTools();
                Addwin.setResizable(false)
                Addwin.on('closed', () => {
                  Addwin = null
                })
                Addwin.setMenu(null)
            }},
            {label: 'Remove a Slang word',click(){//TODO: Add No word Found dialog
                let RemoveWin = new BrowserWindow({width:425, height:200, transparent:true,frame:false})
                //RemoveWin.webContents.openDevTools();
                RemoveWin.setResizable(false);
                RemoveWin.loadFile('src/WordOptions/RemoveWindow/index.html')
                 //RemoveWin.webContents.openDevTools();
                 RemoveWin.on('closed', () => {
                   RemoveWin = null
                 })
                 RemoveWin.setMenu(null)
            }},
            //TODO: May add {label: 'Modify a Slang word'},
            {label: 'Save words',click(){
              win.webContents.send('saveApp')
            }}
        ]
    },
    {
        label:'Contact Us',
        submenu:[
            {label: 'Facebook',click(){shell.openExternal('https://www.facebook.com/CySlangs/')}}
        ]
    }

])
// This method will be called when Electron has fini  initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()

  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
//
// function Add(arg){
//     w(arg)
// }

ipc.on('updateButtons',function(event,args){
  win.webContents.send('updateWords',args)
  //win.webContents.executeJavaScript("")
})

ipc.on('DelWord',(event,args) => {
    win.webContents.send('DelWord',args)
})

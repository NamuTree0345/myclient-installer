const { ipcMain, app, BrowserWindow } = require('electron')
const path = require('path')
const request = require('request')
let window

app.whenReady().then(() => {
    window = new BrowserWindow({
        height: 670,
        width: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    window.loadFile(__dirname + '/index.html')
})

ipcMain.on('loadVersions', (event) => {
    request({
        uri: 'http://localhost:53573',
        method: 'GET',
        headers: {
            Accept: 'Application/json'
        }
    }, (err, res, body) => {
        if(err) {
            console.error(err)
            event.reply('loadedVersions', ['불러오는데 실패하였습니다. 재시작해주세요.'])
            return
        }
        const oldvers = JSON.parse(body).oldVersions
        const latest = JSON.parse(body).latest
        let arr = oldvers
        arr[arr.length] = latest + '(추천)'
        event.reply('loadedVersions', arr)
    })
})
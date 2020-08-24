const { ipcRenderer, dialog, BrowserWindow, BrowserView } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('loadVersions')
    const installButton = document.getElementById('install')
    const tab = document.getElementById('versions')
    installButton.onclick = (ev) => {
        ipcRenderer.send('install', tab.value)
    }
})

ipcRenderer.on('loadedVersions', (event, versions) => {
    const verList = document.getElementById('versions')
    let inner = ''

    versions.forEach((elem) => {
        inner += '<option value="' + elem + '">' + elem + '</option>'
    })

    document.getElementById('dddd').innerHTML = '아래의 버전으로 설치를 시작합니다.'

    document.getElementById('hidden').style.display = 'block'

    verList.innerHTML = inner
})
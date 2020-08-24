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

ipcRenderer.on('download0', (event) => {
    document.getElementById('hidden').style.display = 'none'
    document.getElementById('dddd').innerHTML = '설치중... 1/3, 메인 JAR 다운로드'
})

ipcRenderer.on('downloaded1', (event) => {
    document.getElementById('dddd').innerHTML = '설치중... 2/3, JSON 다운로드'
})

ipcRenderer.on('downloaded2', (event) => {
    document.getElementById('dddd').innerHTML = '설치중... 3/3, 복사'
})
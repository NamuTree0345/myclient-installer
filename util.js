const request = require('request')

/**
 * 
 * @param {String} address 
 * @param {Function} callback
 */

module.exports.downloadFile = async (address, file, callback) => {
    await new Promise((resolve, reject) => {
        let stream = request({
            /* Here you should specify the exact link to the file you are trying to download */
            uri: address,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            },
            /* GZIP true for most of the websites now, disable it if you don't need it */
            gzip: true
        })
        .pipe(file)
        .on('finish', () => {
            console.log(`The file is finished downloading.`);
            callback()
        })
        .on('error', (error) => {
            reject(error);
        })
    })
    .catch(error => {
        console.log(`Something happened: ${error}`);
    });
}
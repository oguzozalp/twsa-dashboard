const fs = require('fs');

function decodeUTF8DoubleEncoded(str) {
    return str.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
        return String.fromCharCode(parseInt(grp, 16));
    }).replace(/[\x00-\xFF]+/g, (match) => {
        try {
            // Convert to a buffer and decode as UTF-8
            return Buffer.from(match, 'latin1').toString('utf8');
        } catch (e) {
            return match;
        }
    });
}

const files = ['havzalar_data.js', 'havzalar.json'];

files.forEach(file => {
    if(fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Let's replace the literal Unicode escapes first
        content = content.replace(/\\u00c4\\u00b1/g, 'ı')
                         .replace(/\\u00c4\\u0178/g, 'ğ')
                         .replace(/\\u00c3\\u00bc/g, 'ü')
                         .replace(/\\u00c3\\u00a7/g, 'ç')
                         .replace(/\\u00c3\\u00b6/g, 'ö')
                         .replace(/\\u00c5\\u0178/g, 'ş')
                         .replace(/\\u00c3\\u2021/g, 'Ç')
                         .replace(/\\u00c4\\u00b0/g, 'İ')
                         .replace(/\\u00c3\\u0153/g, 'Ü')
                         .replace(/\\u00c3\\u2013/g, 'Ö');
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed', file);
    }
});

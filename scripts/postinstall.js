const https = require('https');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

const version = require('../package.json').version;
const url = `https://github.com/itsManeka/astrolink/releases/download/v${version}/swisseph-data.zip`;
const outputPath = path.join(__dirname, '../swisseph-data');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
}

console.log(`🔽 Baixando efemérides de ${url}...`);

https.get(url, (res) => {
    if (res.statusCode !== 200) {
        console.error(`❌ Falha no download. Código HTTP ${res.statusCode}`);
        return;
    }

    res
        .pipe(unzipper.Extract({ path: outputPath }))
        .on('close', () => console.log('✅ Efemérides descompactadas.'))
        .on('error', (err) => console.error('❌ Erro ao descompactar:', err));
});

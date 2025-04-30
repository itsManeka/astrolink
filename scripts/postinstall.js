const fetch = require('node-fetch');
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

fetch(url)
    .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.body.pipe(unzipper.Extract({ path: outputPath }))
            .on('close', () => {
                console.log(`✅ Efemérides extraídas em ${outputPath}`);
            });
    })
    .catch(err => {
        console.error(`❌ Falha no download:`, err.message);
    });
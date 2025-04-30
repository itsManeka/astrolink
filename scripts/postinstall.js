const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

async function downloadLatestRelease() {
    const repoOwner = 'itsManeka';
    const repoName = 'astrolink';

    const releasesUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;

    try {
        console.log(`🔽 Baixando efemérides de ${releasesUrl}...`);

        const response = await fetch(releasesUrl);
        const releaseData = await response.json();

        if (response.status !== 200) {
            console.error(`❌ Failed to fetch releases: ${response.statusText}`);
            return;
        }

        const asset = releaseData.assets.find(asset => asset.name === 'swisseph-data.zip');

        if (!asset) {
            console.error('❌ Arquivo swisseph-data.zip não encontrado no release');
            return;
        }

        const downloadResponse = await fetch(asset.browser_download_url);
        if (!downloadResponse.ok) {
            console.error('❌ Falha no download do arquivo de efemérides');
            return;
        }

        const filePath = path.join(__dirname, '../swisseph-data.zip');
        const directoryPath = path.dirname(filePath);
        
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const fileStream = fs.createWriteStream(filePath);
        downloadResponse.body.pipe(fileStream);

        fileStream.on('finish', () => {
            console.log('✅ Efemérides baixadas com sucesso!');
            console.log(`🔽 Descompactando...`);

            const extractPath = path.join(__dirname, '../swisseph-data');
            if (!fs.existsSync(extractPath)) {
                fs.mkdirSync(extractPath, { recursive: true });
            }

            fs.createReadStream(filePath)
                .pipe(unzipper.Extract({ path: extractPath }))
                .on('close', () => {
                    console.log('✅ Efemérides descompactadas!');
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('❌ Erro ao excluir o arquivo ZIP:', err);
                        } else {
                            console.log('✅ Arquivo ZIP excluído com sucesso!');
                        }
                    });
                });
        });
    } catch (error) {
        console.error('❌ Erro ao baixar efemérides:', error);
    }
}

downloadLatestRelease();
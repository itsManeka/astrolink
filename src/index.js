const swe = require('swisseph');
const path = require('path');
const astroCalculations = require('./astroCalculations');
const numerology = require('./numerology');
const constants = require('./constants');
const utils = require('./utils');

// Configura o caminho para os arquivos de efemérides
swe.swe_set_ephe_path(path.join(__dirname, '../swisseph-data'));

/**
 * Calcula o mapa astral completo baseado nos dados de nascimento
 * @param {Object} data - Dados de nascimento
 * @param {string} data.date - Data de nascimento no formato ISO (YYYY-MM-DD)
 * @param {string} data.time - Hora de nascimento no formato HH:mm
 * @param {number} data.lat - Latitude do local de nascimento
 * @param {number} data.lng - Longitude do local de nascimento
 * @param {string} data.name - Nome da pessoa para cálculos numerológicos
 * @returns {Promise<Object>} Mapa astral completo com astros, casas, distribuições e numerologia
 */
async function calcularMapaAstral(data) {
    const { date, time, lat, lng, name } = data;

    // Validação dos parâmetros obrigatórios
    if (!date || !time || lat == null || lng == null) {
        throw new Error('Parâmetros obrigatórios ausentes: date, time, lat, lng são necessários');
    }

    // Conversão da data e hora para formato numérico
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    const decimalHour = hour + minute / 60;

    return new Promise((resolve, reject) => {
        swe.swe_julday(year, month, day, decimalHour, swe.SE_GREG_CAL, async (jd) => {
            try {
                const casasInfo = await astroCalculations.calcularAscendenteCasas(jd, lat, lng);
                const planetas = await astroCalculations.calcularPlanetas(jd);

                // Busca os astros principais para cálculos específicos
                const sol = planetas.find(p => p.id === swe.SE_SUN);
                const lua = planetas.find(p => p.id === swe.SE_MOON);
                const nodoNorte = planetas.find(p => p.id === swe.SE_MEAN_NODE);

                // Determina se é um mapa noturno (Sol abaixo do horizonte)
                const isNoite = astroCalculations.isMapaNoturno(sol.grauZodiaco, casasInfo.casas);

                // Calcula pontos especiais
                const fortuna = astroCalculations.calcularParteDaFortuna(sol.grauZodiaco, lua.grauZodiaco, casasInfo.pontos.ascendente.grauZodiaco, isNoite);
                const nodoSul = astroCalculations.calcularNodoSul(nodoNorte);

                // Obtém os regentes do signo ascendente
                const regentes = astroCalculations.getRegentes(casasInfo.pontos.ascendente.signo);

                // Consolida todos os astros e pontos para cálculos
                const astros = [
                    ...planetas,
                    nodoSul,
                    fortuna,
                    ...Object.values(casasInfo.pontos),
                ];

                // Calcula o signo dominante baseado no peso dos astros
                const tonica = astroCalculations.calcularSignoDominante(astros);

                // Calcula distribuições por elementos, modalidades e polaridades
                const distribuicaoElementos = astroCalculations.calcularDistribuicao(astros, 'elemento');
                const distribuicaoModalidades = astroCalculations.calcularDistribuicao(astros, 'modalidade');
                const distribuicaoPolaridades = astroCalculations.calcularDistribuicao(astros, 'polaridade');

                // Cálculos numerológicos baseados na data e nome
                const caminhoDaVida = numerology.calcularCaminhoDaVida(date);
                const numeroDestino = numerology.calcularNumeroDestino(name);

                resolve({
                    astros,
                    casas: casasInfo.casas,
                    distribuicao: {
                        elementos: distribuicaoElementos,
                        modalidades: distribuicaoModalidades,
                        polaridades: distribuicaoPolaridades
                    },
                    atributos: {
                        tonica,
                        regentes
                    },
                    numerologia: {
                        caminhoDaVida,
                        numeroDestino,
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    });
}

module.exports = {
    calcularMapaAstral,
    calcularPlanetas: astroCalculations.calcularPlanetas,
    calcularAscendenteCasas: astroCalculations.calcularAscendenteCasas,
    calcularParteDaFortuna: astroCalculations.calcularParteDaFortuna,
    calcularNodoSul: astroCalculations.calcularNodoSul,
    isMapaNoturno: astroCalculations.isMapaNoturno,
    calcularSignoDominante: astroCalculations.calcularSignoDominante,
    getRegentes: astroCalculations.getRegentes,
    grauParaSigno: astroCalculations.grauParaSigno,
    calcularDistribuicao: astroCalculations.calcularDistribuicao,
    calcularCaminhoDaVida: numerology.calcularCaminhoDaVida,
    calcularNumeroDestino: numerology.calcularNumeroDestino,
    reduzirComMestre: numerology.reduzirComMestre,
    reduzirSimples: numerology.reduzirSimples,
    ...constants,
    ...utils
};
const swe = require('swisseph');
const path = require('path');
const astroCalculations = require('./astroCalculations');
const numerology = require('./numerology');
const constants = require('./constants');
const utils = require('./utils');

swe.swe_set_ephe_path(path.join(__dirname, '../swisseph-data'));

async function calcularMapaAstral(data) {
    const { date, time, lat, lng, name } = data;

    if (!date || !time || lat == null || lng == null) {
        throw new Error('Parâmetros ausentes.');
    }

    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    const decimalHour = hour + minute / 60;

    return new Promise((resolve, reject) => {
        swe.swe_julday(year, month, day, decimalHour, swe.SE_GREG_CAL, async (jd) => {
            try {
                const casasInfo = await astroCalculations.calcularAscendenteCasas(jd, lat, lng);
                const planetas = await astroCalculations.calcularPlanetas(jd);

                const sol = planetas.find(p => p.id === swe.SE_SUN);
                const lua = planetas.find(p => p.id === swe.SE_MOON);
                const nodoNorte = planetas.find(p => p.id == swe.SE_MEAN_NODE);

                const isNoite = astroCalculations.isMapaNoturno(sol.grauZoadiaco, casasInfo.casas);

                const fortuna = astroCalculations.calcularParteDaFortuna(sol.grauZoadiaco, lua.grauZoadiaco, casasInfo.pontos.ascendente.grauZoadiaco, isNoite);
                const nodoSul = astroCalculations.calcularNodoSul(nodoNorte);

                const regentes = astroCalculations.getRegentes(casasInfo.pontos.ascendente.signo);

                const astros = [
                    ...planetas,
                    nodoSul,
                    fortuna,
                    ...Object.values(casasInfo.pontos),
                ];

                const tonica = astroCalculations.calcularSignoDominante(astros);

                const distribuicaoElementos = astroCalculations.calcularDistribuicao(astros, 'elemento');
                const distribuicaoModalidades = astroCalculations.calcularDistribuicao(astros, 'modalidade');
                const distribuicaoPolaridades = astroCalculations.calcularDistribuicao(astros, 'polaridade');

                const caminhoDaVida = numerology.calcularCaminhoDaVida(date);
                const nomeroDestino = numerology.calcularNumeroDestino(name);

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
                        nomeroDestino,
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
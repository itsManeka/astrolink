const swe = require('swisseph');
const constants = require('./constants');
const utils = require('./utils');

const calcularAscendenteCasas = async (jd, lat, lng) => {
    return new Promise((resolve, reject) => {
        try {
            const housesData = swe.swe_houses(jd, lat, lng, 'P');

            const casas = housesData.house.map((deg, i) => {
                const { signo, grau } = utils.grauParaSigno(deg);
                return {
                    casa: i + 1,
                    grauZoadiaco: deg,
                    signo,
                    grau
                };
            });

            const ascendente = housesData.ascendant;
            const meioCeu = housesData.mc;
            const fundoCeu = (meioCeu + 180) % 360;
            const descendente = (ascendente + 180) % 360;
            const vertex = housesData.vertex;

            resolve({
                casas,
                pontos: {
                    ascendente: {
                        peso: 4.5,
                        consideraCalculo: true,
                        nome: "Ascendente",
                        classificacao: "Pontos Angulares",
                        grauZoadiaco: ascendente,
                        ...utils.grauParaSigno(ascendente),
                    },
                    descendente: {
                        peso: 0.2,
                        nome: "Descendente",
                        classificacao: "Pontos Angulares",
                        grauZoadiaco: descendente,
                        ...utils.grauParaSigno(descendente),
                    },
                    meioCeu: {
                        peso: 4.5,
                        nome: "Meio do Céu",
                        classificacao: "Pontos Angulares",
                        grauZoadiaco: meioCeu,
                        ...utils.grauParaSigno(meioCeu),
                    },
                    fundoCeu: {
                        peso: 0.2,
                        nome: "Fundo do Céu",
                        classificacao: "Pontos Angulares",
                        grauZoadiaco: fundoCeu,
                        ...utils.grauParaSigno(fundoCeu),
                    },
                    vertex: {
                        peso: 0.2,
                        nome: "Vertex",
                        classificacao: "Outros",
                        grauZoadiaco: vertex,
                        ...utils.grauParaSigno(vertex),
                    },
                }
            });

        } catch (err) {
            reject(err);
        }
    });
};

function calcularPlanetas(jd) {
    const promises = constants.PLANETAS.map(([id, nome, classificacao, peso]) => {
        return new Promise((resolve) => {
            swe.swe_calc_ut(jd, id, swe.SEFLG_SWIEPH, (ret) => {
                const { signo, grau, elemento, modalidade, polaridade } = utils.grauParaSigno(ret.longitude);
                resolve({ id, nome, signo, grau, grauZoadiaco: ret.longitude, classificacao, elemento, modalidade, polaridade, peso });
            });
        });
    });
    return Promise.all(promises);
}

function calcularParteDaFortuna(sol, lua, ascendente, isNoite) {
    const fortuna = isNoite
        ? (ascendente + sol - lua)
        : (ascendente + lua - sol);

    let fortunaReal = ((fortuna % 360) + 360) % 360;
    const { signo, grau, elemento, modalidade, polaridade } = utils.grauParaSigno(fortunaReal);
    return { nome: "Parte da Fortuna", signo, grau, grauZoadiaco: fortunaReal, elemento, modalidade, polaridade, classificacao: "Outros", peso: 0.2 };
}

function calcularNodoSul(nodoNorte) {
    let nodoSul = (nodoNorte.grauZoadiaco + 180) % 360;
    const { signo, grau, elemento, modalidade, polaridade } = utils.grauParaSigno(nodoSul);
    return { nome: "Nodo Sul", signo, grau, grauZoadiaco: nodoSul, elemento, modalidade, polaridade, classificacao: nodoNorte.classificacao, peso: nodoNorte.peso };
}

function isMapaNoturno(solLongitude, casas) {
    return solLongitude < casas[6].grauZoadiaco || solLongitude > casas[0].grauZoadiaco;
}

function calcularSignoDominante(astros) {
    const contagem = {};

    astros.forEach(astro => {
        if (astro.peso) {
            const signo = astro.signo;
            const peso = astro.peso;

            if (signo) {
                contagem[signo] = (contagem[signo] || 0) + peso;
            }
        }
    });

    let dominante = null;
    let maiorContagem = 0;

    for (const signo in contagem) {
        if (contagem[signo] > maiorContagem) {
            dominante = signo;
            maiorContagem = contagem[signo];
        }
    }

    return dominante;
}

function getRegentes(ascendenteSigno) {
    return constants.regentesPorSigno[ascendenteSigno] || [];
}

function calcularDistribuicao(astros, propriedade) {
    const contagem = {};

    astros.forEach(astro => {
        if (astro.peso) {
            const valor = astro[propriedade];
            const peso = astro.peso;

            if (valor) {
                contagem[valor] = (contagem[valor] || 0) + peso;
            }
        }
    });

    const porcentagens = {};
    let somaPesos = Object.values(contagem).reduce((acc, val) => acc + val, 0);

    for (const chave in contagem) {
        porcentagens[chave] = parseFloat(((contagem[chave] / somaPesos) * 100).toFixed(2));
    }

    return porcentagens;
}

module.exports = {
    calcularAscendenteCasas,
    calcularPlanetas,
    calcularParteDaFortuna,
    calcularNodoSul,
    isMapaNoturno,
    calcularSignoDominante,
    getRegentes,
    calcularDistribuicao,
};
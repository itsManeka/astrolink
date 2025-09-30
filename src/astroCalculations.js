const swe = require('swisseph');
const constants = require('./constants');
const utils = require('./utils');

/**
 * Calcula o ascendente e as casas astrológicas usando o sistema Placidus
 * @param {number} jd - Dia Juliano
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<Object>} Objeto contendo casas e pontos angulares
 */
const calcularAscendenteCasas = async (jd, lat, lng) => {
    return new Promise((resolve, reject) => {
        try {
            // Calcula as casas usando o sistema Placidus ('P')
            const housesData = swe.swe_houses(jd, lat, lng, 'P');

            // Mapeia as 12 casas astrológicas
            const casas = housesData.house.map((deg, i) => {
                const { signo, grau } = utils.grauParaSigno(deg);
                return {
                    casa: i + 1,
                    grauZodiaco: deg,
                    signo,
                    grau
                };
            });

            // Calcula pontos angulares importantes
            const ascendente = housesData.ascendant;
            const meioCeu = housesData.mc;
            const fundoCeu = (meioCeu + 180) % 360; // Oposto ao Meio do Céu
            const descendente = (ascendente + 180) % 360; // Oposto ao Ascendente
            const vertex = housesData.vertex;

            resolve({
                casas,
                pontos: {
                    ascendente: {
                        peso: 4.5,
                        consideraCalculo: true,
                        nome: "Ascendente",
                        classificacao: "Pontos Angulares",
                        grauZodiaco: ascendente,
                        ...utils.grauParaSigno(ascendente),
                    },
                    descendente: {
                        peso: 0.2,
                        nome: "Descendente",
                        classificacao: "Pontos Angulares",
                        grauZodiaco: descendente,
                        ...utils.grauParaSigno(descendente),
                    },
                    meioCeu: {
                        peso: 4.5,
                        nome: "Meio do Céu",
                        classificacao: "Pontos Angulares",
                        grauZodiaco: meioCeu,
                        ...utils.grauParaSigno(meioCeu),
                    },
                    fundoCeu: {
                        peso: 0.2,
                        nome: "Fundo do Céu",
                        classificacao: "Pontos Angulares",
                        grauZodiaco: fundoCeu,
                        ...utils.grauParaSigno(fundoCeu),
                    },
                    vertex: {
                        peso: 0.2,
                        nome: "Vertex",
                        classificacao: "Outros",
                        grauZodiaco: vertex,
                        ...utils.grauParaSigno(vertex),
                    },
                }
            });

        } catch (err) {
            reject(err);
        }
    });
};

/**
 * Calcula as posições de todos os planetas e pontos para um dado momento
 * @param {number} jd - Dia Juliano
 * @returns {Promise<Array>} Array com todos os astros e suas posições
 */
function calcularPlanetas(jd) {
    const promises = constants.PLANETAS.map(([id, nome, classificacao, peso]) => {
        return new Promise((resolve) => {
            // Calcula a posição do astro usando efemérides Swiss
            swe.swe_calc_ut(jd, id, swe.SEFLG_SWIEPH, (ret) => {
                const { signo, grau, elemento, modalidade, polaridade } = utils.grauParaSigno(ret.longitude);
                resolve({ id, nome, signo, grau, grauZodiaco: ret.longitude, classificacao, elemento, modalidade, polaridade, peso });
            });
        });
    });
    return Promise.all(promises);
}

/**
 * Calcula a Parte da Fortuna (Pars Fortunae)
 * Fórmula para mapa diurno: Asc + Lua - Sol
 * Fórmula para mapa noturno: Asc + Sol - Lua
 * @param {number} sol - Longitude do Sol em graus
 * @param {number} lua - Longitude da Lua em graus
 * @param {number} ascendente - Longitude do Ascendente em graus
 * @param {boolean} isNoite - Se é um mapa noturno
 * @returns {Object} Objeto da Parte da Fortuna
 */
function calcularParteDaFortuna(sol, lua, ascendente, isNoite) {
    // Aplica a fórmula correta baseada no tipo de mapa
    const fortuna = isNoite
        ? (ascendente + sol - lua)
        : (ascendente + lua - sol);

    // Normaliza o resultado para 0-360 graus
    let fortunaReal = ((fortuna % 360) + 360) % 360;
    const { signo, grau, elemento, modalidade, polaridade } = utils.grauParaSigno(fortunaReal);
    return { nome: "Parte da Fortuna", signo, grau, grauZodiaco: fortunaReal, elemento, modalidade, polaridade, classificacao: "Outros", peso: 0.2 };
}

/**
 * Calcula o Nodo Sul baseado no Nodo Norte
 * O Nodo Sul está sempre exatamente oposto ao Nodo Norte (180°)
 * @param {Object} nodoNorte - Objeto do Nodo Norte
 * @returns {Object} Objeto do Nodo Sul
 */
function calcularNodoSul(nodoNorte) {
    // O Nodo Sul é sempre oposto ao Nodo Norte
    let nodoSul = (nodoNorte.grauZodiaco + 180) % 360;
    const { signo, grau, elemento, modalidade, polaridade } = utils.grauParaSigno(nodoSul);
    return { nome: "Nodo Sul", signo, grau, grauZodiaco: nodoSul, elemento, modalidade, polaridade, classificacao: nodoNorte.classificacao, peso: nodoNorte.peso };
}

/**
 * Determina se o mapa é noturno baseado na posição do Sol
 * Um mapa é noturno quando o Sol está abaixo do horizonte (casas 1-6)
 * @param {number} solLongitude - Longitude do Sol em graus
 * @param {Array} casas - Array das casas astrológicas
 * @returns {boolean} True se o mapa for noturno
 */
function isMapaNoturno(solLongitude, casas) {
    // Verifica se o Sol está nas casas abaixo do horizonte (casas 1-6)
    return solLongitude < casas[6].grauZodiaco || solLongitude > casas[0].grauZodiaco;
}

/**
 * Calcula o signo dominante baseado no peso dos astros
 * @param {Array} astros - Array de astros com seus pesos
 * @returns {string|null} Signo dominante ou null se não houver
 */
function calcularSignoDominante(astros) {
    const contagem = {};

    // Soma os pesos de cada signo
    astros.forEach(astro => {
        if (astro.peso && astro.signo) {
            const signo = astro.signo;
            const peso = astro.peso;
            contagem[signo] = (contagem[signo] || 0) + peso;
        }
    });

    // Encontra o signo com maior peso total
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

/**
 * Obtém os planetas regentes de um signo
 * @param {string} ascendenteSigno - Nome do signo
 * @returns {Array} Array com os nomes dos planetas regentes
 */
function getRegentes(ascendenteSigno) {
    return constants.regentesPorSigno[ascendenteSigno] || [];
}

/**
 * Calcula a distribuição percentual de uma propriedade dos astros
 * @param {Array} astros - Array de astros
 * @param {string} propriedade - Propriedade a ser analisada (elemento, modalidade, polaridade)
 * @returns {Object} Objeto com as porcentagens de cada valor da propriedade
 */
function calcularDistribuicao(astros, propriedade) {
    const contagem = {};

    // Soma os pesos por valor da propriedade
    astros.forEach(astro => {
        if (astro.peso && astro[propriedade]) {
            const valor = astro[propriedade];
            const peso = astro.peso;
            contagem[valor] = (contagem[valor] || 0) + peso;
        }
    });

    // Converte para porcentagens
    const porcentagens = {};
    const somaPesos = Object.values(contagem).reduce((acc, val) => acc + val, 0);

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
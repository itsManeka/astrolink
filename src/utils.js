const constants = require('./constants');

/**
 * Converte graus do zodíaco (0-360) para signo e propriedades astrológicas
 * @param {number} degree - Grau no zodíaco (0-360)
 * @returns {Object} Objeto com signo, grau, elemento, modalidade e polaridade
 */
function grauParaSigno(degree) {
    // Determina o índice do signo (0-11) baseado na divisão por 30°
    const index = Math.floor(degree / 30);
    // Calcula o grau dentro do signo (0-30°)
    const grau = degree % 30;
    
    const signo = constants.signos[index];
    
    return {
        signo,
        polaridade: constants.polaridades[signo],
        modalidade: constants.modalidades[signo],
        elemento: constants.elementos[signo],
        grau: parseFloat(grau.toFixed(2))
    };
}

/**
 * Reduz um número considerando os números mestres (11, 22, 33)
 * Função duplicada - mantida por compatibilidade
 * @param {number} n - Número a ser reduzido
 * @returns {number} Número reduzido ou número mestre
 */
function reduzirComMestre(n) {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
        n = n.toString().split('').reduce((acc, dig) => acc + parseInt(dig), 0);
    }
    return n;
}

/**
 * Reduz um número até um único dígito (1-9)
 * Função duplicada - mantida por compatibilidade
 * @param {number} numero - Número a ser reduzido
 * @returns {number} Número reduzido a um dígito
 */
function reduzirSimples(numero) {
    while (numero > 9) {
        numero = numero.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
    }
    return numero;
}

module.exports = {
    grauParaSigno,
    reduzirComMestre,
    reduzirSimples,
};
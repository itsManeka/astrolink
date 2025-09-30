const constants = require('./constants');
const utils = require('./utils');

/**
 * Calcula o número do Caminho da Vida baseado na data de nascimento
 * Soma todos os dígitos da data e reduz considerando números mestres
 * @param {string} dataISO - Data no formato ISO (YYYY-MM-DD)
 * @returns {Object} Objeto com o número bruto, final e representação
 */
function calcularCaminhoDaVida(dataISO) {
    // Remove caracteres não numéricos e soma todos os dígitos
    const numeros = dataISO.replace(/\D/g, '');
    const soma = numeros.split('').reduce((acc, dig) => acc + parseInt(dig), 0);

    // Verifica se é um número mestre (11, 22, 33)
    const isMestre = soma === 11 || soma === 22 || soma === 33;
    const reduzido = isMestre ? utils.reduzirSimples(soma) : soma;

    return {
        bruto: soma,
        final: reduzido,
        representacao: isMestre ? `${soma}/${reduzido}` : `${reduzido}`
    };
}

/**
 * Calcula o Número do Destino baseado no nome completo
 * Converte cada letra para seu valor numerológico e soma
 * @param {string} nome - Nome completo da pessoa
 * @returns {number|undefined} Número do destino ou undefined se nome não fornecido
 */
function calcularNumeroDestino(nome) {
    if (nome) {
        // Remove caracteres especiais e converte para maiúsculas
        const letras = nome.toUpperCase().replace(/[^A-Z]/g, '');
        // Soma os valores numerológicos de cada letra
        const soma = letras.split('').reduce((acc, letra) => acc + (constants.letraParaNumero[letra] || 0), 0);
        return utils.reduzirComMestre(soma);
    }
    return undefined;
}

/**
 * Reduz um número considerando os números mestres (11, 22, 33)
 * Números mestres não são reduzidos
 * @param {number} n - Número a ser reduzido
 * @returns {number} Número reduzido ou número mestre
 */
function reduzirComMestre(n) {
    // Reduz até um dígito, exceto para números mestres
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
        n = n.toString().split('').reduce((acc, dig) => acc + parseInt(dig), 0);
    }
    return n;
}

/**
 * Reduz um número até um único dígito (1-9)
 * Não considera números mestres
 * @param {number} numero - Número a ser reduzido
 * @returns {number} Número reduzido a um dígito
 */
function reduzirSimples(numero) {
    // Reduz sempre até um dígito, ignorando números mestres
    while (numero > 9) {
        numero = numero.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
    }
    return numero;
}

module.exports = {
    calcularCaminhoDaVida,
    calcularNumeroDestino,
    reduzirComMestre,
    reduzirSimples,
};
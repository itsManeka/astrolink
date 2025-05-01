const constants = require('./constants');
const utils = require('./utils');

function calcularCaminhoDaVida(dataISO) {
    const numeros = dataISO.replace(/\D/g, '');
    const soma = numeros.split('').reduce((acc, dig) => acc + parseInt(dig), 0);

    const isMestre = soma === 11 || soma === 22 || soma === 33;
    const reduzido = isMestre ? utils.reduzirSimples(soma) : soma;

    return {
        bruto: soma,
        final: reduzido,
        representacao: isMestre ? `${soma}/${reduzido}` : `${reduzido}`
    };
}

function calcularNumeroDestino(nome) {
    if (nome) {
        const letras = nome.toUpperCase().replace(/[^A-Z]/g, '');
        const soma = letras.split('').reduce((acc, letra) => acc + (constants.letraParaNumero[letra] || 0), 0);
        return utils.reduzirComMestre(soma);
    }
    return undefined;
}

function reduzirComMestre(n) {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
        n = n.toString().split('').reduce((acc, dig) => acc + parseInt(dig), 0);
    }
    return n;
}

function reduzirSimples(numero) {
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
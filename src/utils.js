const constants = require('./constants');

function grauParaSigno(degree) {
    const index = Math.floor(degree / 30);
    const grau = degree % 30;
    return {
        signo: constants.signos[index],
        polaridade: constants.polaridades[constants.signos[index]],
        modalidade: constants.modalidades[constants.signos[index]],
        elemento: constants.elementos[constants.signos[index]],
        grau: parseFloat(grau.toFixed(2))
    };
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
    grauParaSigno,
    reduzirComMestre,
    reduzirSimples,
};
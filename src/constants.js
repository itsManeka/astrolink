module.exports = {
    PLANETAS: [
        [require('swisseph').SE_SUN, 'Sol', 'Luminares', 6],
        [require('swisseph').SE_MOON, 'Lua', 'Luminares', 6],
        [require('swisseph').SE_MERCURY, 'Mercúrio', 'Planetas Pessoais', 4],
        [require('swisseph').SE_VENUS, 'Vênus', 'Planetas Pessoais', 4],
        [require('swisseph').SE_MARS, 'Marte', 'Planetas Pessoais', 4],
        [require('swisseph').SE_JUPITER, 'Júpiter', 'Planetas Sociais', 2],
        [require('swisseph').SE_SATURN, 'Saturno', 'Planetas Sociais', 2],
        [require('swisseph').SE_URANUS, 'Urano', 'Planetas Geracionais', 1],
        [require('swisseph').SE_NEPTUNE, 'Netuno', 'Planetas Geracionais', 1],
        [require('swisseph').SE_PLUTO, 'Plutão', 'Planetas Geracionais', 1],
        [require('swisseph').SE_MEAN_APOG, 'Lilith', 'Outros', 0.2],
        [require('swisseph').SE_CHIRON, 'Quíron', 'Outros', 0.2],
        [require('swisseph').SE_PHOLUS, 'Pholus', 'Outros', 0.2],
        [require('swisseph').SE_CERES, 'Ceres', 'Outros', 0.2],
        [require('swisseph').SE_PALLAS, 'Palas', 'Outros', 0.2],
        [require('swisseph').SE_JUNO, 'Juno', 'Outros', 0.2],
        [require('swisseph').SE_VESTA, 'Vesta', 'Outros', 0.2],
        [require('swisseph').SE_MEAN_NODE, 'Nodo Norte', 'Nodos Lunares', 0.2]
    ],
    regentesPorSigno: {
        "Áries": ["Marte"],
        "Touro": ["Vênus"],
        "Gêmeos": ["Mercúrio"],
        "Câncer": ["Lua"],
        "Leão": ["Sol"],
        "Virgem": ["Mercúrio"],
        "Libra": ["Vênus"],
        "Escorpião": ["Marte", "Plutão"],
        "Sagitário": ["Júpiter"],
        "Capricórnio": ["Saturno"],
        "Aquário": ["Saturno", "Urano"],
        "Peixes": ["Júpiter", "Netuno"],
    },
    elementos: {
        'Áries': 'Fogo', 'Leão': 'Fogo', 'Sagitário': 'Fogo',
        'Touro': 'Terra', 'Virgem': 'Terra', 'Capricórnio': 'Terra',
        'Gêmeos': 'Ar', 'Libra': 'Ar', 'Aquário': 'Ar',
        'Câncer': 'Água', 'Escorpião': 'Água', 'Peixes': 'Água'
    },
    modalidades: {
        'Áries': 'Cardinal', 'Câncer': 'Cardinal', 'Libra': 'Cardinal', 'Capricórnio': 'Cardinal',
        'Touro': 'Fixo', 'Leão': 'Fixo', 'Escorpião': 'Fixo', 'Aquário': 'Fixo',
        'Gêmeos': 'Mutável', 'Virgem': 'Mutável', 'Sagitário': 'Mutável', 'Peixes': 'Mutável'
    },
    polaridades: {
        'Áries': 'Positiva', 'Gêmeos': 'Positiva', 'Leão': 'Positiva', 'Libra': 'Positiva', 'Sagitário': 'Positiva', 'Aquário': 'Positiva',
        'Touro': 'Negativa', 'Câncer': 'Negativa', 'Virgem': 'Negativa', 'Escorpião': 'Negativa', 'Capricórnio': 'Negativa', 'Peixes': 'Negativa'
    },
    signos: ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"],
    letraParaNumero: {
        A: 1, J: 1, S: 1,
        B: 2, K: 2, T: 2,
        C: 3, L: 3, U: 3,
        D: 4, M: 4, V: 4,
        E: 5, N: 5, W: 5,
        F: 6, O: 6, X: 6,
        G: 7, P: 7, Y: 7,
        H: 8, Q: 8, Z: 8,
        I: 9, R: 9
    }
};
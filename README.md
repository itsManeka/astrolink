# 🌟 Astrolink

[![npm version](https://badge.fury.io/js/%40itsmaneka%2Fastrolink.svg)](https://badge.fury.io/js/%40itsmaneka%2Fastrolink)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

Astrolink é uma biblioteca JavaScript avançada para cálculos astrológicos e numerológicos de alta precisão. Utilizando as renomadas efemérides Swiss Ephemeris, oferece cálculos astronômicos precisos e algoritmos numerológicos otimizados.

## ✨ Características

- **Alta Precisão**: Utiliza Swiss Ephemeris para cálculos astronômicos
- **Completo**: Cálculos de planetas, casas, pontos especiais e numerologia
- **Moderno**: Suporte nativo a Promises/async-await
- **Leve**: Dependências mínimas e download automático de dados
- **Flexível**: API simples e intuitiva para integração

## 📦 Instalação

### Via npm
```bash
npm install @itsmaneka/astrolink
```

### Via yarn
```bash
yarn add @itsmaneka/astrolink
```

### Requisitos
- **Node.js**: Versão 18 ou superior
- **Espaço em disco**: ~50MB para arquivos de efemérides

> 📁 **Nota**: Os arquivos de efemérides Swiss Ephemeris são baixados automaticamente após a instalação via script `postinstall`.

## 🚀 Guia de Uso

### Importação

```javascript
// CommonJS
const astrolink = require('@itsmaneka/astrolink');

// ESM (com babel/typescript)
import * as astrolink from '@itsmaneka/astrolink';
```

### Cálculo do Mapa Astral Completo

```javascript
const data = {
    date: '1995-03-06', // Data de nascimento (YYYY-MM-DD)
    time: '14:30',      // Hora de nascimento (HH:mm)
    lat: -23.5505,      // Latitude (São Paulo, Brasil)
    lng: -46.6333,      // Longitude (São Paulo, Brasil)
    name: 'João Silva'  // Nome completo para numerologia
};

// Usando async/await
try {
    const mapa = await astrolink.calcularMapaAstral(data);
    console.log('Mapa Astral:', mapa);
} catch (error) {
    console.error('Erro ao calcular mapa:', error);
}

// Usando Promises
astrolink.calcularMapaAstral(data)
    .then(mapa => {
        console.log('Ascendente:', mapa.atributos.tonica);
        console.log('Distribuição de Elementos:', mapa.distribuicao.elementos);
    })
    .catch(error => {
        console.error('Erro:', error.message);
    });
```

### 📊 Estrutura do Retorno

O retorno do cálculo do mapa astral é um objeto completo contendo:

```javascript
{
    // Array com todos os astros e pontos calculados
    astros: [
        {
            id: 0,                    // ID Swiss Ephemeris
            nome: "Sol",              // Nome do astro
            signo: "Peixes",          // Signo zodiacal
            grau: 15.28,              // Grau dentro do signo (0-30)
            grauZodiaco: 345.28,      // Posição total no zodíaco (0-360)
            classificacao: "Luminares", // Categoria do astro
            elemento: "Água",          // Elemento do signo
            modalidade: "Mutável",     // Modalidade do signo
            polaridade: "Negativa",   // Polaridade do signo
            peso: 6                   // Peso para cálculos de dominância
        }
        // ... outros astros, pontos angulares, nodos, etc.
    ],
    
    // As 12 casas astrológicas (sistema Placidus)
    casas: [
        {
            casa: 1,                  // Número da casa
            grauZodiaco: 328.71,      // Posição da cúspide
            signo: "Aquário",          // Signo da cúspide
            grau: 28.71               // Grau dentro do signo
        }
        // ... casas 2-12
    ],
    
    // Distribuições percentuais baseadas no peso dos astros
    distribuicao: {
        elementos: {
            "Água": 30.28,
            "Terra": 21.6,
            "Ar": 30.28,
            "Fogo": 17.84
        },
        modalidades: {
            "Mutável": 28.17,
            "Fixo": 66.2,
            "Cardinal": 5.63
        },
        polaridades: {
            "Negativa": 51.88,
            "Positiva": 48.12
        }
    },
    
    // Atributos principais do mapa
    atributos: {
        tonica: "Aquário",         // Signo dominante
        regentes: ["Saturno", "Urano"] // Regentes do ascendente
    },
    
    // Cálculos numerológicos
    numerologia: {
        caminhoDaVida: {
            bruto: 33,              // Soma original
            final: 6,               // Número reduzido
            representacao: "33/6"   // Formato de exibição
        },
        numeroDestino: 8            // Baseado no nome
    }
}
```

## 🔍 API Reference

### Funções Principais

#### `calcularMapaAstral(data)`
Calcula o mapa astral completo com todas as informações.

**Parâmetros:**
- `data` (Object): Dados de nascimento
  - `date` (string): Data no formato 'YYYY-MM-DD'
  - `time` (string): Hora no formato 'HH:mm'
  - `lat` (number): Latitude (-90 a 90)
  - `lng` (number): Longitude (-180 a 180)
  - `name` (string, opcional): Nome para cálculos numerológicos

**Retorna:** `Promise<Object>` - Mapa astral completo

### Funções Astrológicas

| Função | Descrição | Parâmetros | Retorno |
|---------|-----------|-----------|----------|
| `calcularPlanetas(julianDay)` | Calcula posições planetárias | `julianDay` (number) | `Promise<Array>` |
| `calcularAscendenteCasas(jd, lat, lng)` | Calcula ascendente e casas | `jd, lat, lng` (numbers) | `Promise<Object>` |
| `calcularParteDaFortuna(sol, lua, asc, isNoite)` | Calcula Parte da Fortuna | Longitudes e tipo de mapa | `Object` |
| `calcularNodoSul(nodoNorte)` | Calcula Nodo Sul | `nodoNorte` (Object) | `Object` |
| `isMapaNoturno(sol, casas)` | Verifica se é mapa noturno | Posição solar e casas | `boolean` |
| `calcularSignoDominante(astros)` | Determina signo dominante | `astros` (Array) | `string` |
| `grauParaSigno(degree)` | Converte grau em signo | `degree` (number) | `Object` |
| `calcularDistribuicao(astros, prop)` | Calcula distribuições | `astros, propriedade` | `Object` |
| `getRegentes(signo)` | Obtém regentes do signo | `signo` (string) | `Array` |

### Funções Numerológicas

| Função | Descrição | Parâmetros | Retorno |
|---------|-----------|-----------|----------|
| `calcularCaminhoDaVida(dataISO)` | Número do Caminho da Vida | `dataISO` (string) | `Object` |
| `calcularNumeroDestino(nome)` | Número do Destino | `nome` (string) | `number` |
| `reduzirComMestre(numero)` | Redução com números mestres | `numero` (number) | `number` |
| `reduzirSimples(numero)` | Redução simples | `numero` (number) | `number` |

## 📋 Exemplos Práticos

### Cálculo de Planetas Individuais
```javascript
const julianDay = 2451545.0; // J2000.0
const planetas = await astrolink.calcularPlanetas(julianDay);
console.log('Sol:', planetas.find(p => p.nome === 'Sol'));
```

### Cálculo Apenas de Numerologia
```javascript
const caminho = astrolink.calcularCaminhoDaVida('1995-03-06');
const destino = astrolink.calcularNumeroDestino('João Silva');
console.log(`Caminho da Vida: ${caminho.representacao}`);
console.log(`Número do Destino: ${destino}`);
```

### Conversão de Graus
```javascript
const info = astrolink.grauParaSigno(345.28);
console.log(`15°28' de ${info.signo}`);
console.log(`Elemento: ${info.elemento}, Modalidade: ${info.modalidade}`);
```

### Tratamento de Erros
```javascript
try {
    const mapa = await astrolink.calcularMapaAstral({
        date: '1995-03-06',
        time: '14:30',
        lat: -23.5505,
        lng: -46.6333
        // nome ausente - numerologia retornará undefined
    });
} catch (error) {
    if (error.message.includes('Parâmetros')) {
        console.error('Verifique os parâmetros obrigatórios');
    }
}
```

## 🏗 Estrutura do Projeto

```
astrolink/
├── src/
│   ├── index.js              # Ponto de entrada e função principal
│   ├── astroCalculations.js  # Cálculos astrológicos específicos
│   ├── numerology.js        # Cálculos numerológicos
│   ├── constants.js         # Constantes astrológicas
│   └── utils.js             # Funções utilitárias
├── scripts/
│   └── postinstall.js       # Download automático de efemérides
├── swisseph-data/           # Arquivos de efemérides (baixados automaticamente)
├── package.json
└── README.md
```

### Componentes Principais

| Arquivo | Responsabilidade |
|---------|------------------|
| `index.js` | API pública, orquestração dos cálculos |
| `astroCalculations.js` | Lógica astrológica, interface com Swiss Ephemeris |
| `numerology.js` | Algoritmos numerológicos e reduções |
| `constants.js` | Definições de planetas, signos e correspondências |
| `utils.js` | Conversões e funções auxiliares |
| `postinstall.js` | Gerência de download das efemérides |

## 🔧 Tecnologias Utilizadas

- **[Swiss Ephemeris](https://www.astro.com/swisseph/)**: Biblioteca astronômica de alta precisão
- **Node.js**: Runtime JavaScript
- **Sistema Placidus**: Para cálculo das casas astrológicas
- **Numerologia Pitagórica**: Para cálculos numerológicos

## 📈 Precisão e Validação

Os cálculos são validados contra:
- Efemérides JPL (NASA)
- Software astrológico profissional
- Precisão de arco-segundo para posições planetárias

## 🌐 Suporte a Coordenadas

- **Latitudes**: -90° a +90° (Sul negativo, Norte positivo)
- **Longitudes**: -180° a +180° (Oeste negativo, Leste positivo)
- **Fuso Horário**: Calculado automaticamente com base nas coordenadas
- **Período**: Suporta datas de -13000 a +17000 (limitado pelas efemérides)

## ⚙️ Requisitos do Sistema

- **Node.js**: 18.x ou superior
- **Memória RAM**: Mínimo 512MB disponível
- **Espaço em Disco**: 50MB para arquivos de efemérides
- **Conexão com a Internet**: Necessária apenas na primeira instalação

## 🐛 Solução de Problemas

### Erro de Download das Efemérides
```bash
# Reinstale o pacote para retentar o download
npm install @itsmaneka/astrolink --force
```

### Erro de Memória
Verifique se há memória suficiente disponível. Os cálculos podem ser intensivos para períodos longos.

### Coordenadas Inválidas
Verifique se latitude está entre -90 e 90, e longitude entre -180 e 180.

## 🤝 Contribuição

Contribuições são muito bem-vindas! Para contribuir:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Reportando Bugs

Por favor, inclua:
- Versão do Node.js
- Sistema operacional
- Dados de entrada que causaram o erro
- Stack trace completo

## 🔗 Links Úteis

- **NPM**: [@itsmaneka/astrolink](https://www.npmjs.com/package/@itsmaneka/astrolink)
- **GitHub**: [Repositório Oficial](https://github.com/itsManeka/astrolink)
- **Documentação Swiss Ephemeris**: [astro.com/swisseph](https://www.astro.com/swisseph/)
- **Issues e Suporte**: [GitHub Issues](https://github.com/itsManeka/astrolink/issues)

---

**Desenvolvido com ❤️ por [Emanuel Ozorio Dias](https://github.com/itsManeka)**

*"A astrologia é uma linguagem. Se você entende essa linguagem, o céu fala com você."*
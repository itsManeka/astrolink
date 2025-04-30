# Astrolink

Astrolink é uma biblioteca para cálculos astrológicos e numerológicos, utilizando dados astronômicos precisos e algoritmos avançados.

## Instalação

Você pode instalar o pacote diretamente do npm:

```bash
npm install @itsmaneka/astrolink
```

Após a instalação, os arquivos de efemérides necessários serão baixados automaticamente.

## Uso

### Importação

```javascript
const astrolink = require('@itsmaneka/astrolink');
```

### Cálculo do Mapa Astral

```javascript
const data = {
    date: '1995-03-06', // Data de nascimento no formato ISO (YYYY-MM-DD)
    time: '14:30',      // Hora de nascimento no formato HH:mm
    lat: -23.5505,      // Latitude do local de nascimento
    lng: -46.6333,      // Longitude do local de nascimento
    name: 'João'  // Nome da pessoa
};

astrolink.calcularMapaAstral(data)
    .then(mapa => {
        console.log(mapa);
    })
    .catch(error => {
        console.error(error);
    });
```

### Exemplo de Retorno

O retorno do cálculo do mapa astral inclui informações detalhadas sobre os astros, casas, distribuição de elementos, modalidades, polaridades e numerologia. Exemplo:

```json
{
    "astros": [
        {
            "id": 0,
            "nome": "Sol",
            "signo": "Peixes",
            "grau": 15.28,
            "grauZodiaco": 345.2809760940058,
            "classificacao": "Lumiar",
            "elemento": "Água",
            "modalidade": "Mutável",
            "polaridade": "Negativa",
            "peso": 6
        },
        ...
    ],
    "casas": [
        {
            "casa": 1,
            "grauZodiaco": 328.70566569778435,
            "signo": "Aquário",
            "grau": 28.71
        },
        ...
    ],
    "distribuicao": {
        "elementos": {
            "Água": 30.28,
            "Terra": 21.6,
            "Ar": 30.28,
            "Fogo": 17.84
        },
        "modalidades": {
            "Mutável": 28.17,
            "Fixo": 66.2,
            "Cardinal": 5.63
        },
        "polaridades": {
            "Negativa": 51.88,
            "Positiva": 48.12
        }
    },
    "atributos": {
        "tonica": "Aquário",
        "regentes": [
            "Saturno",
            "Urano"
        ]
    },
    "numerologia": {
        "caminhoDaVida": {
            "bruto": 33,
            "final": 6,
            "representacao": "<span class=\"math-inline\">{soma}/</span>{reduzido}"
        },
        "nomeroDestino": 8
    }
}
```

### Funções Disponíveis

#### Astrologia

- `calcularMapaAstral(data)`: Calcula o mapa astral completo.
- `calcularPlanetas(julianDay)`: Calcula as posições dos planetas.
- `calcularAscendenteCasas(julianDay, lat, lng)`: Calcula o ascendente e as casas astrológicas.
- `calcularParteDaFortuna(sol, lua, ascendente, isNoite)`: Calcula a Parte da Fortuna.
- `calcularNodoSul(nodoNorte)`: Calcula o Nodo Sul.
- `isMapaNoturno(sol, casas)`: Verifica se o mapa é noturno.
- `calcularSignoDominante(astros)`: Determina o signo dominante.
- `grauParaSigno(degree)`: Converte um grau em um signo astrológico.

#### Numerologia

- `calcularCaminhoDaVida(dataISO)`: Calcula o número do caminho da vida com base na data de nascimento.
- `calcularNumeroDestino(nome)`: Calcula o número do destino com base no nome.
- `reduzirComMestre(numero)`: Reduz um número considerando números mestres (11, 22, 33).
- `reduzirSimples(numero)`: Reduz um número até um único dígito.

## Estrutura do Projeto

```
.gitignore
package.json
README.md
src/
    astroCalculations.js
    constants.js
    index.js
    numerology.js
    utils.js
swisseph-data/
    seas_00.se1
    ...
```

### Diretório `src`

- **`astroCalculations.js`**: Contém funções relacionadas a cálculos astrológicos.
- **`constants.js`**: Define constantes usadas em cálculos astrológicos e numerológicos.
- **`index.js`**: Ponto de entrada principal da biblioteca.
- **`numerology.js`**: Contém funções relacionadas a cálculos numerológicos.
- **`utils.js`**: Funções utilitárias para cálculos e conversões.

### Diretório `swisseph-data`

Os arquivos de dados necessários para cálculos astronômicos precisos são baixados automaticamente após a instalação do pacote.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests no repositório oficial: [Astrolink no GitHub](https://github.com/itsManeka/astrolink).


## Links

- **NPM**: [@itsmaneka/astrolink](https://www.npmjs.com/package/@itsmaneka/astrolink)
- **GitHub**: [Astrolink no GitHub](https://github.com/itsManeka/astrolink)
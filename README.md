# Astrolink

Astrolink é uma biblioteca para cálculos astrológicos e numerológicos, utilizando dados astronômicos precisos e algoritmos avançados.

## Instalação

Você pode instalar o pacote diretamente do npm:

```bash
npm install astrolink
```

## Uso

### Importação

```javascript
const astrolink = require('astrolink');
```

### Cálculo do Mapa Astral

```javascript
const data = {
    date: '1995-03-06', // Data de nascimento no formato ISO (YYYY-MM-DD)
    time: '14:30',      // Hora de nascimento no formato HH:mm
    lat: -23.5505,      // Latitude do local de nascimento
    lng: -46.6333,      // Longitude do local de nascimento
    name: 'João Silva'  // Nome da pessoa
};

astrolink.calcularMapaAstral(data)
    .then(mapa => {
        console.log(mapa);
    })
    .catch(error => {
        console.error(error);
    });
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

Contém os arquivos de dados necessários para cálculos astronômicos precisos, fornecidos pela biblioteca Swiss Ephemeris.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests no repositório oficial: [Astrolink no GitHub](https://github.com/itsManeka/astrolink).
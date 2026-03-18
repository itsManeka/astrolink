# astrolink

Biblioteca Node.js de calculos astrologicos. NAO e um servico — e uma dependencia do fireabse-astro-api.

## Stack

- Node.js com TypeScript (ou JavaScript)
- swisseph (Swiss Ephemeris bindings para Node.js)

## Funcionalidades

- Calculos de posicoes planetarias
- Calculo de casas astrologicas
- Aspectos entre planetas
- Mapa natal completo
- Transitos planetarios

## Importante

- Esta e uma **biblioteca**, nao um servico. Nao roda standalone.
- Consumida pelo `fireabse-astro-api` como dependencia npm
- Publicada como `@itsmaneka/astrolink`
- `swisseph` requer compilacao nativa (node-gyp)

## Comandos

```bash
npm install
npm test
npm run build
```

## Ao modificar

1. Lembrar que `fireabse-astro-api` depende desta lib
2. Manter backward compatibility na API publica
3. Testes para calculos astronomicos devem usar dados verificados

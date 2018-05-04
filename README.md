# npm-request-json

## Usage

```js
const npmRequestJson = require('npm-request-json');

npmRequestJson({ name: 'npm-request-json', version: 'latest' })
  .then((pkgData) => {
    // http://registry.npmjs.com/npm-request-json/latest
  })
  .catch(cosnole.error);
```

# Jase64

_Compress JSON to URL-safe Base64_

## Installing

```bash
npm install jase64
```

## Using
```es6
import Jase64 from 'jase64';

const data = {some: "big data", structure: "with stuff"};
const b64ed = Jase64.compress(data);
console.log(b64ed);  // 

const origData = Jase64.decompress(b64ed);
console.assert(JSON.stringify(data) === JSON.stringify(origData));
```

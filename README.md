# Bucket Filter
[![Build Status](https://travis-ci.org/grindcode/bucket-filter.svg?branch=master)](https://travis-ci.org/grindcode/bucket-filter) [![Dependency Status](https://david-dm.org/grindcode/bucket-filter.svg)](https://david-dm.org/grindcode/bucket-filter) [![devDependency Status](https://david-dm.org/grindcode/bucket-filter/dev-status.svg)](https://david-dm.org/grindcode/bucket-filter#info=devDependencies)

Array filtering allowing multiple conditions and concurrency limit.

## Get Started
```shell
npm install bucket-filter
```

## API
### filter(array, callbacks[, thisArg])
Returns new _Array_ containing values filtered by `callbacks`.
* `array`: Array to filter. (**Array**)
* `callbacks`: Array of functions to be evaluated: (**Array**)
  * `condition` Condition evaluation returning boolean (**Function**)
  * `limit`: Optional. Condition results limit (**Number**)
* `thisArg`: Optional. Value to use as _this_ when executing `callback`.

### Usage
```javascript
// Note: This example uses ES6 syntax
var filter = require('bucket-filter')

var data = [
  { type: 1, title: 'foo-1-1' },
  // ...
  { type: 2, title: 'foo-2-1' },
  // ...
]

var conditions = [
  // Include max 2 values where type is 1
  { limit: 2, condition: (i) => i.type === 1 },
  // Include all values where type is 2
  { limit: -1, condition: (i) => i.type === 2 }
  // All values not matching any condition will be dismissed
]

filter(data, conditions)
// → []
```

## Benchmark
```shell
node benchmark.js
```

### Results
```shell
10x array / 1x filter x 271,122 ops/sec ±1.00% (85 runs sampled)
10x array / 2x filter x 199,617 ops/sec ±1.25% (84 runs sampled)
10x array / 5x filter x 78,228 ops/sec ±0.91% (78 runs sampled)
```

## License
See the [License](LICENSE) file.

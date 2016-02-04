# Bucket Filter
[![Build Status](https://travis-ci.org/grindcode/bucket-filter.svg?branch=master)](https://travis-ci.org/grindcode/bucket-filter) [![Dependency Status](https://david-dm.org/grindcode/bucket-filter.svg)](https://david-dm.org/grindcode/bucket-filter) [![devDependency Status](https://david-dm.org/grindcode/bucket-filter/dev-status.svg)](https://david-dm.org/grindcode/bucket-filter#info=devDependencies)

Array filtering using buckets. Allows infinite buckets, bucket size limit, keeps input order and discards unmatched elements.

## Get Started
```shell
npm install bucket-filter
```

## API
### filter(input, buckets[, this])
Returns new _Array_ containing values filtered by `buckets`.
* `input`: Array input. (**Array**)
* `buckets`: Array of buckets: (**Array**)
  * `condition`: Evaluates bucket selection. Return boolean. (**Function**)
  * `limit`: Optional. Bucket size limit. (**Number**)
* `this`: Optional. Value of _this_ when executing each bucket `condition`. (**Mixed**)

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

var buckets = [
  // Include max 2 values where type is 1
  { condition: (i) => i.type === 1, limit: 2 },
  // Include all values where type is 2
  { condition: (i) => i.type === 2 }
  // All values not matching any condition will be dismissed
]

filter(data, buckets)
// → []
```

## Benchmark
```shell
node benchmark.js
```

### Results
```shell
10x array / 1x bucket x 660,885 ops/sec ±1.88% (81 runs sampled)
10x array / 2x buckets x 474,259 ops/sec ±3.27% (73 runs sampled)
10x array / 5x buckets x 222,545 ops/sec ±1.23% (77 runs sampled)
```

## License
See the [License](LICENSE) file.

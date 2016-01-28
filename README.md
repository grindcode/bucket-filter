# Bucket Filter
[![Build Status](https://travis-ci.org/grindcode/bucket-filter.svg?branch=master)](https://travis-ci.org/grindcode/bucket-filter) [![Dependency Status](https://david-dm.org/grindcode/bucket-filter.svg)](https://david-dm.org/grindcode/bucket-filter) [![devDependency Status](https://david-dm.org/grindcode/bucket-filter/dev-status.svg)](https://david-dm.org/grindcode/bucket-filter#info=devDependencies)

Array filtering allowing multiple conditions and concurrency limit.

## Get Started
```bash
npm install bucket-filter
```

## API
### filter(array, callbacks[, thisArg])
Returns new _Array_ containing values filtered by `callbacks`.
* `array`: Array to filter. (**Array**)
* `conditions`: Array of functions to be evaluated: (**Array**)
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

## License
See the [License](LICENSE) file.

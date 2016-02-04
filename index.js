var fast = require('fast.js')
module.exports = function (input, buckets, self) {
  if (!Array.isArray(input))
    throw new TypeError('First argument invalid. Expected Array.')
  if (!Array.isArray(buckets))
    return input
  return fast.reduce(input, function (output, value) {
    var eligible = fast.some(buckets, function (bucket) {
      if ('function' !== typeof bucket.condition)
        throw new TypeError('Bucket condition argument invalid. Expected function.')
      if (!bucket.condition.call(self, value))
        return false
      if (!bucket.limit)
        return true
      if ('number' !== typeof bucket.limit)
        throw new TypeError('Bucket limit argument invalid. Expected number or undefined.')
      return fast.filter(output, bucket.condition, self).length < bucket.limit
    })
    return (eligible)? fast.concat(output, value): output
  }, [])
}

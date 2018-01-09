/**
 * Array filtering using buckets.
 * @param {Array} input - Array input.
 * @param {Array} buckets - Array of buckets.
 * @param {Mixed} self - Value of this when executing each bucket condition.
 * @returns {Array} Resulting array.
 */
module.exports = function (input, buckets, self) {
  if (!Array.isArray(input))
    throw new TypeError('First argument invalid. Expected Array.')
  if (!Array.isArray(buckets))
    return input
  return input.reduce(function (output, value) {
    var eligible = buckets.some(function (bucket) {
      if ('function' !== typeof bucket.condition)
        throw new TypeError(
          'Bucket condition argument invalid. Expected function.')
      if (!bucket.condition.call(self, value))
        return false
      if (!bucket.limit)
        return true
      if ('number' !== typeof bucket.limit)
        throw new TypeError(
          'Bucket limit argument invalid. Expected number or undefined.')
      return output.filter(bucket.condition, self).length < bucket.limit
    })
    return (eligible)? output.concat(value): output
  }, [])
}

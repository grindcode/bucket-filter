var fast = require('fast.js')
module.exports = function (data, filters, self) {
  if (!Array.isArray(data))
    throw new TypeError('First argument invalid. Expected Array.')
  if (!Array.isArray(filters))
    return data
  return fast.reduce(data, function (res, value) {
    var eligible = fast.some(filters, function (filter) {
      if ('function' !== typeof filter.condition)
        throw new TypeError('Callback condition argument invalid. Expected function.')
      if (!filter.condition.call(self, value))
        return false
      if (!filter.limit)
        return true
      var concurrency = fast.filter(res, filter.condition, self).length
      if ('number' !== typeof filter.limit)
        throw new TypeError('Callback limit argument invalid. Expected number or undefined.')
      return concurrency < filter.limit
    })
    return (eligible)? fast.concat(res, value): res
  }, [])
}

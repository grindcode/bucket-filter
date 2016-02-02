module.exports = function (data, filters, self) {
  if (void 0 === data || null === data)
    throw new TypeError('First argument invalid. Expected Array.')
  if (!Array.isArray(filters)) return data
  return data.reduce(function (res, value) {
    var eligible = filters.some(function (filter) {
      if ('function' !== typeof filter.condition)
        throw new TypeError('Callback condition argument invalid. Expected function.')
      if (!filter.condition.call(self, value)) return false
      if (!filter.limit) return true
      var concurrency = res.filter(filter.condition, self).length
      if ('number' !== typeof filter.limit)
        throw new TypeError('Callback limit argument invalid. Expected number or undefined.')
      return concurrency < filter.limit
    })
    return (eligible)? res.concat(value): res
  }, [])
}

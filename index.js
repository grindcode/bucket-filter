module.exports = function (data, filters, self) {
  if (void 0 === data || null === data) throw new TypeError
  if (!Array.isArray(filters)) return data
  return data.reduce(function (res, value) {
    var eligible = filters.some(function (filter) {
      if ('function' !== typeof filter.condition) throw new TypeError
      if (!filter.condition.call(self, value)) return false
      if (!filter.limit) return true
      if ('number' !== typeof filter.limit) throw new TypeError
      var concurrency = res.filter(filter.condition, self).length
      return concurrency < filter.limit
    })
    return (eligible)? res.concat(value): res
  }, [])
}

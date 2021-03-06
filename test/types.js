var test = require('tape')
var filter = require('../index.js')

var data = [
  { type: 1, title: 'foo-1-1' },
  { type: 1, title: 'foo-1-2' },
  { type: 1, title: 'foo-1-3' },
  { type: 2, title: 'foo-2-1' },
  { type: 2, title: 'foo-2-2' },
  { type: 3, title: 'foo-3-1' },
  { type: 3, title: 'foo-3-2' },
  { type: 3, title: 'foo-3-3' },
  { type: 4, title: 'foo-4-1' },
  { type: 5, title: 'foo-5-1' }
]

test('input argument invalid', function (t) {
  t.plan(1)
  t.throws(function () {
    filter('this is not an array', [])
  })
  t.end()
})

test('bucket condition invalid', function (t) {
  t.plan(1)
  var buckets = [
    { condition: 'this is not a function', limit: 2 }
  ]
  t.throws(function () {
    filter(data, buckets)
  })
  t.end()
})

test('bucket size limit invalid', function (t) {
  t.plan(1)
  var buckets = [
    { condition: function (i) { return i.type === 2 }, limit: 'this is not a number' }
  ]
  t.throws(function () {
    filter(data, buckets)
  })
  t.end()
})

test('buckets argument invalid', function (t) {
  t.plan(1)
  var result = filter(data)
  t.deepEqual(result, data)
  t.end()
})

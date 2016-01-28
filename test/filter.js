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

test('filter', function (t) {
  t.plan(1)
  var result = filter(data, [
    { condition: function (i) { return i.type === 1 }, limit: 2 },
    { condition: function (i) { return i.type === 2 }, limit: 1 },
    { condition: function (i) { return i.type === 4 }}
  ])
  t.deepEqual(result, [
    { type: 1, title: 'foo-1-1' },
    { type: 1, title: 'foo-1-2' },
    { type: 2, title: 'foo-2-1' },
    { type: 4, title: 'foo-4-1' }
  ]);
  t.end()
})

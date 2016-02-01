var Benchmark = require('benchmark')
var Suite = new Benchmark.Suite
var filter = require('./index.js')

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

Suite
  .add('10x array / 1x filter', function () {
    filter(data, [
      { condition: function (i) { return i.type === 1 }, limit: 2 }
    ])
  })
  .on('cycle', function (e) {
    console.log(String(e.target))
  })
  .run({ async: true })

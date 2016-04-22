var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var jsonParser = bodyParser.json()
var jsonfile = require('jsonfile')
var app = express()
app.set('port', (process.env.PORT || 3000))
app.use(express.static('public'))

var masterFile = 'public/bingo_array.json'
var outputFile = 'public/out.json'

app.get('/data', function (req, res) {
  jsonfile.readFile(masterFile, function (err, obj) {
    res.send(obj)
  })
})

app.post('/data', jsonParser, function (req, res) {
  jsonfile.writeFile(outputFile, req.body, function (err) {
    if (err) res.send(err)
    res.send('ok')
  })
})

app.listen(app.get('port'), function () {
  console.log('Server Start at port ', app.get('port'))
})

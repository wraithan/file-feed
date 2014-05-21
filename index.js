var fs = require('fs')
var path = require('path')
var http = require('http')
var config = require('./config')

var server = http.createServer(function (req, res) {
  console.log(req.url);

  var fileList = []

  fs.readdir(config.path, function (err, files) {
    var len = files.length
    for (var i = 0; i < len; i++) {
      var file = files[i]
      var stats = fs.statSync(path.join(config.path, file))
      fileList.push({
        name: file,
        value: stats.ctime.getFullYear()+'-'+(stats.ctime.getMonth()+1)+'-'+stats.ctime.getDate(),
        date: stats.ctime
      })
    }

    fileList.sort(function (a, b) {
      return b.date - a.date
    })

    res.write(JSON.stringify({
      title: 'downloads',
      date: Date().toLocaleString().slice(0, -15),
      type: 'list',
      data: fileList.slice(0, 5)
    }))
    res.end()
  })

})

server.listen(5000, function () {console.log('listening on port 5000')})
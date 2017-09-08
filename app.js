var express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    app = express()

var fileuploader = require('./controller/fileuploader') 

    

app.use(bodyParser.json());
app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

/**load file upload form*/
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.use(fileuploader)



app.listen(3000, function () {
    console.log('App start at localhost 3000......')
})
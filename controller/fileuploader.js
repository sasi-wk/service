var multer = require('multer')
var express = require('express')
var fileuploader = express()
var fileReader = require('./fileReader')



/**set folder for file upload*/
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        //cb(null, file.originalname);
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

/**call multer*/
var upload = multer({ //multer settings
    storage: storage
}).single('file');

/** API path that will upload the files */
fileuploader.post('/upload', function (req, res) {
        upload(req, res, function (err) {
            console.log(req.file);
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            fileReader.fileReader(
                {
                inputPath: 'uploads/' + req.file.filename,
                callback: function (list) {
                    console.log(list)
                    // for (let i in list) {
                    //     //วนลูปส่งค่าไปยัง PHIE
                    // }
                }
            })
           res.json({ status: 'upload success', filename: req.file.filename})
        }) 
})

module.exports = fileuploader;
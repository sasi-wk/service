var multer = require('multer'),
    express = require('express'),
    fileuploader = express(),
    fileReader = require('./fileReader'),
    uploaded = require('./uploaded');
var datetimestamp = Date.now();
var date = new Date();
var typeoffile = '';
/**set folder for file upload*/
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        typeoffile = '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
        cb(null, file.fieldname + '-' + datetimestamp + typeoffile);
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
            uploaded.uploadInfo(
                {
                    uploader: "sasi",
                    datetimestamp: date,
                    filename: req.file.filename,
                    err_msg: err
                }
            )
            res.json({ error_code: 1, err_desc: err });
        }

        if (typeoffile !== ".zip") {
            res.send('only file zip')
            console.log("only zip file")
        }
        else {
            uploaded.uploadInfo(
                {
                    uploader: "sasi",
                    datetimestamp: date,
                    filename: req.file.filename,
                    err_msg: "uploaded"
                }
            )

            fileReader.fileReader(
                {
                    inputPath: 'uploads/' + req.file.filename,
                    callback: function (list) {
                        //console.log('list complete')
                        // for (let i in list) {
                        //     //วนลูปส่งค่าไปยัง PHIE
                        // }
                    }
                })
            res.json({ status: 'upload success', filename: req.file.filename })
        }
    })
})

module.exports = fileuploader;
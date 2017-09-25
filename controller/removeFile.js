var rmdir = require('rmdir');


module.exports = {
    removeOutputdir : function(path){
        rmdir(path, function (err, dirs, files) {
            console.log(dirs);
            console.log(files);
            console.log('all files are removed');
          });
    }
}


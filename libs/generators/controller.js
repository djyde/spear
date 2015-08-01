var fs = require('fs')
  , path = require('path')
  , async = require('async')

module.exports = function(component,name){
  var controllerPath = path.join(process.cwd(),'app',name);
  async.waterfall([
    function(callback){
      fs.mkdir(controllerPath,function(err){
        callback(err);
      })
    },
    function(callback){
      var controllerTemplate = path.join(__dirname,'../templates/controller/controller.js');
      fs.readFile(controllerTemplate,function(err,data){
        var projectName = JSON.parse(fs.readFileSync(path.join(process.cwd(),'config.json'))).projectName;
        callback(err,data.toString().replace(/{{project}}/g, projectName).replace(/{{controller}}/g,capitalizeFirstLetter(name)));
      })
    },
    function(controllerString,callback){
      fs.writeFile(path.join(controllerPath,name + '.controller.js'),controllerString,function(err){
        callback(err);
      })
    }
  ],function(err){
    if (err) {
      console.error('Generate',component,'failed:',err);
    } else {
      console.log('Generate',component,'success!');
    }
  })

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

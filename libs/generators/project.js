var fs = require('fs')
  , path = require('path')
  , async = require('async')

module.exports = function(project){
  // folder need to be created
  var projectFolder = path.join(process.cwd(),project);
  var appFolder = path.join(process.cwd(),project,'app');
  var configFolder = path.join(appFolder,'config');

  var stylesFolder = path.join(process.cwd(),project,'styles');
  var scriptsFolder = path.join(process.cwd(),project,'scripts');

  async.waterfall([
    function(callback){
      async.mapSeries([projectFolder,appFolder,configFolder,stylesFolder,scriptsFolder],fs.mkdir,function(err){
        callback(err);
      })
    },
    function(callback){
      var moduleTemplate = path.join(__dirname, '../templates/module/app.module.js');
      fs.readFile(moduleTemplate,function(err,data){
        callback(err, data.toString().replace('{{project}}', project));
      })
    },
    function(moduleFileString,callback){
      fs.writeFile(path.join(appFolder,'app.module.js'), moduleFileString, function(err){
        callback(err);
      })
    },
    function(callback){
      var routeTemplate = path.join(__dirname, '../templates/config/route.config.js');
      fs.readFile(routeTemplate,function(err,data){
        callback(err, data.toString().replace('{{project}}', project));
      })
    },
    function(configFileString,callback){
      fs.writeFile(path.join(configFolder,'route.config.js'), configFileString, function(err){
        callback(err);
      })
    },
    function(callback){
      fs.readFile(path.join(__dirname, '../templates/config.json'),function(err,data){
        callback(err,data.toString().replace('{{project}}',project));
      })
    },
    function(configString,callback){
      fs.writeFile(path.join(projectFolder,'config.json'),configString,function(err){
        callback(err);
      })
    }
  ],
  function(err){
    if (err) {
      console.error('Error while creating project',project,err);
    } else {
      console.log('Create project',project,'success!');
    }
  })

}

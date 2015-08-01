(function(){
  'use strict';

  angular
    .module('{{project}}')
    .controller('{{controller}}',{{controller}});

  // Demo:
  //
  // {{controller}}.$inject = ['$location'];
  //
  // function {{controller}}($location){
  //   var scope = this;
  //   scope.currentUrl = $location.url();
  // }

  function {{controller}}(){
    var scope = this;
  }

})()

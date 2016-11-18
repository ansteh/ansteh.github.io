var app = angular.module('app', ['ngMaterial', 'LocalStorageModule']);

app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('roi-charts');
});

app.factory('Request', function($http) {
  function get(url){
    return new Promise(function(resolve, reject) {
      $http({ method: 'GET', url: url })
      .then(function (response) {
        resolve(response.data);
      }, function (err) {
        reject(err);
      });
    });
  };

  return {
    get: get
  };
});

app.factory('PromiseStorageService', function(localStorageService) {

  var cache = function(key, promise) {
    return new Promise(function(resolve, reject) {
      if(localStorageService.isSupported) {
        var value = localStorageService.get(key);
        if(value) {
          resolve(value);
        } else {
          promise()
          .then(function(result) {
            localStorageService.set(key, result);
            resolve(result);
          })
          .catch(function(err) {
            reject(err);
          });
        }
      } else {
        promise()
        .then(function(data) {
          resolve(data);
        })
        .catch(function(err) {
          reject(err);
        });
      }
    });
  };

  return {
    cache: cache
  };
});

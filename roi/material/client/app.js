var app = angular.module('app', ['ngMaterial', 'LocalStorageModule', 'ngMessages']);

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

app.directive('datepickerValidationFix', function () {
    return {
        restrict: 'A',
        require: 'mdDatepicker',
        link: function (scope, element, attrs, mdDatepickerCtrl) {
            // Fix to run validation when a datepicker's minDate changes
            // Bug #5938
            mdDatepickerCtrl.$scope.$watch(function () { return mdDatepickerCtrl.minDate; }, function () {
                if (mdDatepickerCtrl.dateUtil.isValidDate(mdDatepickerCtrl.date)) {
                    mdDatepickerCtrl.updateErrorState.call(mdDatepickerCtrl);
                }
            });

            // Fix to clear error state when setting date programatically from null
            // Bug #6086
            mdDatepickerCtrl.$scope.$watch(function () { return mdDatepickerCtrl.date; }, function (newVal, oldVal) {
                mdDatepickerCtrl.updateErrorState.call(mdDatepickerCtrl);
            });
        }
    };
});

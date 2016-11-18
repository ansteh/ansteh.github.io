app.factory('Quandl', function(Request, localStorageService, PromiseStorageService) {
  // localStorageService.clearAll();
  var createWikiUrl = _.template('https://www.quandl.com/api/v3/datasets/WIKI/${ name }.json');

  function get(name) {
    var url = createWikiUrl({ name: _.toUpper(name) });
    return PromiseStorageService.cache(url, function() {
      return Request.get(url);
    });
  };

  return {
    get: get
  };
});

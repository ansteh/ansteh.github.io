app.factory('Quandl', function(Request, localStorageService, PromiseStorageService) {
  // localStorageService.clearAll();
  var createWikiUrlTemplate = _.template('https://www.quandl.com/api/v3/datasets/WIKI/${ ticker }.json');

  function createWikiUrl(stock) {
    return createWikiUrlTemplate(stock);
  };

  function get(ticker) {
    var url = createWikiUrl({ ticker: _.toUpper(ticker) });
    return PromiseStorageService.cache(url, function() {
      return Request.get(url);
    });
  };

  function getBy(meta) {
    var url = createWikiUrl(meta);
    return PromiseStorageService.cache(url, function() {
      return Request.get(url);
    });
  };

  return {
    createWikiUrl: createWikiUrl,
    get: get,
    getBy: getBy
  };
});

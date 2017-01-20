app.factory('Quandl', function(Request, localStorageService, PromiseStorageService) {
  // localStorageService.clearAll();
  var createWikiUrlTemplate = _.template('https://www.quandl.com/api/v3/datasets/${ directory }/${ ticker }.json');

  function createWikiUrl(stock) {
    if(stock) return createWikiUrlTemplate({
      ticker: _.toUpper(stock.ticker),
      directory: getDirectory(stock)
    });
  };

  function getDirectory(stock) {
    var directory = _.first(stock.free_code.split('/'));
    return _.toUpper(directory);
  }

  function get(stock) {
    var url = createWikiUrl(stock);
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

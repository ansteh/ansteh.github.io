//https://blog.quandl.com/useful-lists
app.factory('QuandlLists', function($http, Request, PromiseStorageService) {
  function parseCSV(str, delimiter) {
		delimiter = delimiter || ",";
		var pattern = new RegExp("(\\"+delimiter+"|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\"\\"+delimiter+"\\r\\n]*))","gi");
		var data = [[]];
		var matches = null;
		while (matches = pattern.exec(str)){
			var matchedDelimiter = matches[1];
			if (matchedDelimiter.length && (matchedDelimiter !== delimiter)){
				data.push([]);
			}
			if (matches[2]){
				var match = matches[2].replace(new RegExp("\"\"", "g"), "\"");
			} else {
				var match = matches[3];
			}
			data[data.length-1].push(match);
		}
		return data;
	}

  function jsonArray(keys, collection) {
    return _.map(collection, function(item) {
      var json = {};
      _.forEach(keys, function(key, index) {
        json[key] = item[index];
      });
      return json;
    });
  }

  function jsonCSV(csvStr) {
    var collection = parseCSV(csvStr);
    var columns = collection.shift();
    return jsonArray(columns, collection);
  }

  function getSP500(){
    // var url = createWikiUrl({ name: _.toUpper(name) });
    // return PromiseStorageService.cache(url, function() {
      return Request.get('/resources/SP500.csv')
        .then(jsonCSV);
    // });
  };

  return {
    getSP500: getSP500
  };
});

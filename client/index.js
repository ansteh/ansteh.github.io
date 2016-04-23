(function(jQuery, location){
  var queryString = function (str) {
    str = str.split('?')[1] || '';
  	if (typeof str !== 'string') {
  		return {};
  	}

  	str = str.trim().replace(/^(\?|#|&)/, '');

  	if (!str) {
  		return {};
  	}

  	return str.split('&').reduce(function (ret, param) {
  		var parts = param.replace(/\+/g, ' ').split('=');
  		var key = parts.shift();
  		var val = parts.length > 0 ? parts.join('=') : undefined;
  		key = decodeURIComponent(key);
  		val = val === undefined ? null : decodeURIComponent(val);
  		if (!ret.hasOwnProperty(key)) {
  			ret[key] = val;
  		} else if (Array.isArray(ret[key])) {
  			ret[key].push(val);
  		} else {
  			ret[key] = [ret[key], val];
  		}
  		return ret;
  	}, {});
  };

  var query = queryString(location.href);
  var defaultPackage = query.q || 'shape-json';

  function requestDownloads(name){
    var url = 'https://api.npmjs.org/downloads/range/last-month/'+encodeURIComponent(name);
    return jQuery.getJSON(url)
      .success(function(response){
        if(response.downloads){
          plot(response);
        }
      });
  };

  function plot(info){
    var data = info.downloads;
    MG.convert.date(data, 'day', '%Y-%m-%d');
    MG.data_graphic({
      //title: info.package,
      description: "dowloads of last month",
      data: data,
      full_width: true,
      target: document.getElementById('package-downloads'),
      x_accessor: 'day',
      y_accessor: 'downloads'
    });
  };

  jQuery(document).ready(function(){
    message(defaultPackage);
    requestDownloads(defaultPackage)
    .then(function(response){
      if(response.package){
        showTotalDownloads(response);
      }
    });

    var input = jQuery('#package-needle');
    input.focus();

    function message(name){
      var npmLink = 'https://www.npmjs.com/package/'+name;
      var backLink = location.origin+'/?q='+name;
      jQuery('#package-message').html('<a href="'+npmLink+'">'+name+'</a> wants to be remembered <a href="'+backLink+'">'+backLink+'</a>!');
    };

    function showTotalDownloads(response){
      if(response.downloads){
        var downloads = response.downloads.reduce(function(sum, day){
          return sum + day.downloads;
        }, 0);
        jQuery('#package-total-downloads').html('<bold>'+downloads+'</bold> downloads in the last month');
      }
    };

    input.keyup(function(event){
      var code = event.keyCode || event.which;
      if(code == 13) {
        var name = input.val();
        requestDownloads(name)
        .then(function(response){
          if(response.package){
            console.log(response.package);
            message(response.package);
            showTotalDownloads(response);
          }
        })
        .fail(function(err) {

        });
      }
    });

    /*setTimeout(function(){
      jQuery('#google-trends').html('<iframe class="center-block" src="/npm/package/metrics/test.html" style="width: 550px; height: 360px; border: 0;"></iframe>');
    }, 1500);*/
  });
}(jQuery, location));

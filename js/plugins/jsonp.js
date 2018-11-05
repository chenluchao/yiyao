function jsonp(url, data, success) {
		var script = document.createElement("script");
		document.body.appendChild(script);
		url += "?";
		for(var attr in data) {
			url += attr + "=" + data[attr] + "&";
		}
		url = url.slice(0, -1);
		script.src = url;
		script.onload = function() {
			document.body.removeChild(script);
		}
		window[data.callback] = function(data) {
			success(data);
		}
	}

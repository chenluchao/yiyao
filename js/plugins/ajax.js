function ajax(option){
	var xhr = new XMLHttpRequest();
	
	if(option.method.toLowerCase() == "get"){
		option.url += "?";
		for(var attr in option.data){
			option.url += attr+"="+option.data[attr]+"&";
		}
		option.url = option.url.slice(0,-1);
	}

	xhr.open(option.method,option.url,true);

	if(option.method.toLowerCase() == "post"){
		xhr.setRequestHeader("Content-Type","application/json");
	}

	xhr.send(JSON.stringify(option.data));

	xhr.onreadystatechange=function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				if(option.success)option.success(JSON.parse(xhr.responseText));
			}else{
				if(option.error)option.error(xhr);
			}
		}
	}
}
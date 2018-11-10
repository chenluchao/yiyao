function setCookie(key,value,days){
	var date = new Date();
	date.setDate(date.getDate()+days);
	document.cookie = key+"="+value+"; expires="+date;
}
function getCookie(key){
	var cookies = document.cookie.split("; ");
	for(var i=0; i<cookies.length; i++){
		var cook = cookies[i].split("=");
		if(cook[0]==key){
			return cook[1];
		}
	}
	return null;
}
function removeCookie(key){
	setCookie(key,"",-1);
}
function clearCookie(){
	var cookies = document.cookie.split("; ");
	for(var i=0; i<cookies.length; i++){
		var cook = cookies[i].split("=");
		removeCookie(cook[0]);
	}
}
function findRepeat(id){
	var cookies = getCookie("car").split("&");
	for(var i=0; i<cookies.length; i++){
		var cook = cookies[i].split("|");
			if(cook[0] == id){
				return true;
			}
		}
	return false;
}
function find(arr,id){
	for(var i=0; i<arr.length; i++){
		if(arr[i].itemId == id){
			return arr[i];
		}
	}
	return null;
}
function changeNum(id,num){
	var carpros = getCookie("car").split("&");
	for(var i=0; i<carpros.length; i++){
		var pro = carpros[i].split("|");
		if(id == pro[0]){
			pro[1] = parseInt(pro[1])+parseInt(num);
			if(pro[1]<=0){
				carpros.splice(i,1);
			}else{
				carpros.splice(i,1,pro.join("|"));
			}
		}
}
	setCookie("car",carpros.join("&"),7);
	window.location.reload(true);
}
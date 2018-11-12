requirejs.config({
	baseUrl: "js",
	paths: {
		extend: "plugins/jquery.extend",
		jquery: "libs/jquery.min",
		cookie:"plugins/cookie"
	},
	shim: {
		extend: {
			deps: ["jquery"]
		},
		jquery: {
			exports: "jQuery"
		},
	}
});
requirejs(["jquery", "extend","cookie"], function($){
	$(".log_form .tab").tab("active","click");
});
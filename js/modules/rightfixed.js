define(['jquery'], function(rightfixed) {
	function loadrightfixed() {
		$(".float_box").load("html/rightfiixed.html", function() {
			$(".float_box #gotop").click(function() {
				$('body,html').animate({
					scrollTop: 0
				}, 1000);
			});
		});
	};
	return {
		loadrightfixed: loadrightfixed,
	};
});
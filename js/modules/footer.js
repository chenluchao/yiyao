define(['jquery'], function($) {
	function loadfooter() {
		$(".loadfoot").load("html/footer.html", function() {
			$(".footer>div>div").hover(function() {
				$(this).stop().animate({
					top:20
				})
			},function(){
				$(this).stop().animate({
					top:40
				})
			});
		});	
	}
	return {
		loadfooter: loadfooter,
	}
});
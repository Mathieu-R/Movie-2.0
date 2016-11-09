$(function(){
	$(".search").mouseover(function() {
		$(this).addClass("searchOn");
	})
	$(".search").mouseleave(function() {
		$(this).removeClass("searchOn");
	})
})
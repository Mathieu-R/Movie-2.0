$(document).ready(function(){
	$(".plusInfos").click(function(e) {
		alert('click');
		var $this = $(this);
		if(!($this.find(".ripple").length)) {
			$this.prepend("<span class=ripple></span>");
		}

		var ripple = $this.find('.ripple');
		ripple.removeClass('animate');

		var d = Math.max($this.outerWidth(), $this.outerHeight());

		var x = e.pageX - $this.offset().left - ripple.width()/2;
		var y = e.pageY - $this.offset().top - ripple.height()/2;

		ripple.css({top: y+'px', left: x+'px', height:d, width:d}).addClass("animate");
	})
});
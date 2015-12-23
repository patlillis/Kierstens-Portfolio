//= require_tree .
//= stub plugins


$(function() {
	$('.hero').height($(window).height()+50);

	$('.message-box').css({'marginTop':$(window).height()*0.4});

	/*============================================
		Resize Functions
	==============================================*/
	$(window).resize(function(){
		$('.hero').height($(window).height());
		$('.message-box').css({'marginTop':$(window).height()*0.4});
	});

	if ($(window).scrollTop()===0){
		$('#main-navbar').removeClass('scrolled');
	}
	else{
		$('#main-navbar').addClass('scrolled');    
	}

	$(window).scroll(function(){
		if ($(window).scrollTop()===0){
			$('#main-navbar').removeClass('scrolled');
		}
		else{
			$('#main-navbar').addClass('scrolled');    
		}
	});
});
//= require_tree .
//= stub plugins


$(function() {
$('.jumbotron').height($(window).height()+50);
$('.message-box').css({'marginTop':$(window).height()*0.4});

/*============================================
	Resize Functions
	==============================================*/
	$(window).resize(function(){
		$('.jumbotron').height($(window).height());
		$('.message-box').css({'marginTop':$(window).height()*0.4});
//		scrollSpyRefresh();
		waypointsRefresh();
	});
	
	/*============================================
	Backstretch Images
	==============================================*/
	$.backstretch('images/header-bg.jpg');

//	$('body').append('<img class="preload-image" src="assets/contact-bg.jpg" style="display:none;"/>');

//	$('#about').waypoint(function(direction){
//	
//		if($('.preload-image').length){$('.preload-image').remove();}
//		
//		$('.backstretch').remove();
//	
//		if (direction=='down'){
//			$.backstretch('assets/contact-bg.jpg');
//		}else{
//			$.backstretch('assets/header-bg.jpg');
//		}
//	});

/*============================================
	Refresh waypoints function
	==============================================*/
	function waypointsRefresh(){
		setTimeout(function(){
			Waypoint.refreshAll();
		},1000);
	}
  
});
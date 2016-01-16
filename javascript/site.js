//= require_tree .
//= stub plugins


$(function() {
	$('.hero').height($(window).height());

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
		//Handle navbar
		if ($(window).scrollTop()===0){
			$('#main-navbar').removeClass('scrolled');
		}
		else{
			$('#main-navbar').addClass('scrolled');    
		}
	});

	var portfolioItems = $('#my_work .item-image');
	var portfolioItemsData = [
	{
		title: 'St. Catherine of Siena Academy',
		description: "A video about the educational and spiritual benefits of this women's Catholic high school. Footage captured by Highway Media Inc."
	},
	{
		title: 'Plymouth Rocks! City Promo',
		description: "30-second commercial about Plymouth, MI. Footage and guitar animation provided by Highway Media Inc."
	},
	{
		title: 'OLGC Tithing',
		description: "A video for Our Lady of Good Counsel Catholic Church about the importance of tithing. Footage captured by Highway Media Inc."
	},
	{
		title: 'KIDSGala Promo Video',
		description: 'A video about the non-profit KIDSgala, which "provides a celebration of life to children who have or are battling a life altering event...." Footage captured by VideoMagic Productions.'
	},
	{
		title: 'Roemer Wedding Video',
		description: "Wedding recap film. Footage captured by VideoMagic Productions."
	},
	{
		title: 'Bronik Wedding Video',
		description: "Wedding recap film. Footage captured by VideoMagic Productions."
	}
	];

	for (var i = 0; i < portfolioItemsData.length; i++) {
		portfolioItems.eq(2*i).add(portfolioItems.eq((2*i) + 1)).magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			closeBtnInside: true,
			mainClass: 'my-mfp-slide-bottom',
			fixedContentPos: true,
			fixedBgPos: true,
			iframe: {
				markup: magnificPopupContent(portfolioItemsData[i].title, portfolioItemsData[i].description)
			}
		});
	}

	// Make sure close button works
	$(document).on('click', '.mfp-close-custom', function() {
		portfolioItems.magnificPopup('close');
	});

 	// HTML markup of popup, `mfp-close` will be replaced by the close button
 	function magnificPopupContent(title, description) {
 		return '<div class="mfp-iframe-scaler" style="overflow: initial;">'+
 		'<button class="mfp-close-custom"><i class="glyphicon glyphicon-remove"></i></button>'+
 		'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
 		'<h3>' + title + '</h5>' +
 		"<p>" + description + "</p>" +
 		'</div>';
 	}
 	
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) 
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
 });
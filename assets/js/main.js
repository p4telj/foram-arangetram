// Jimil Patel / Nritya Nipuna

$(function() {
	// GENERAL FEATURES
	$('.hide-until-ready').removeClass('hide-until-ready');
	$('.ui-loader').remove();
	initSmoothScrolling();
	initLazyLoading();
	var isMobile = mobileCheck();
	featureAdjustments(isMobile);
	
	// HEADER
	expandHeader();
	
	// ABOUT SECTIONS
	fillBackgrounds();

	// SIDEBARS
	initAltHeader();
	$('.sidr-sidebar li').off();
	initVideoSidebar();
	initOpenCloseSidebars();

	// CAROUSELS
	initProgramCarousel();
	initPicturesCarousel();

	// GENERAL FEATURES (CONTINUED)
	// added after other features initialized
	anchorLinkSmoothScroll();
	animationHandler();
});

////////////////////////
/// GENERAL FEATURES ///
////////////////////////

function initSmoothScrolling() {
	window.scroll({
		behavior: 'smooth' 
	  });
}

function initLazyLoading() {
	[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
		img.setAttribute('src', img.getAttribute('data-src'));
		img.onload = function() {
			img.removeAttribute('data-src');
		};
	});

	// if links clicked, prioritize lazy loading.
	$.each($('a'), function() {
		if (this.hash == '#program') {
			$(this).on('click', function() {
				[].forEach.call(document.querySelectorAll('img[data-brochure-src]'), function(img) {
					img.setAttribute('src', img.getAttribute('data-brochure-src'));
					img.onload = function() {
						img.removeAttribute('data-brochure-src');
					};
				});
			});
		} else if (this.hash == '#pictures') {
			$(this).on('click', function() {
				[].forEach.call(document.querySelectorAll('img[data-gallery-src]'), function(img) {
					img.setAttribute('src', img.getAttribute('data-gallery-src'));
					img.onload = function() {
						img.removeAttribute('data-gallery-src');
					};
				});
				$('#pictures-title').find('i').css('transition', 'opacity 5s').css('opacity', '0');
			});
		} else if (this.hash == '#foram' | this.hash == '#juhi' | this.hash == '#guru') {
			$(this).on('click', function() {
				[].forEach.call(document.querySelectorAll('img[data-about-src]'), function(img) {
					img.setAttribute('src', img.getAttribute('data-about-src'));
					img.onload = function() {
						img.removeAttribute('data-about-src');
					};
				});
			});
		}
	});

	var brochureWaypoint = new Waypoint({
		element: document.getElementById('people-title'),
		handler: function(direction) {
			// if (direction == 'down') {
				[].forEach.call(document.querySelectorAll('img[data-brochure-src]'), function(img) {
					img.setAttribute('src', img.getAttribute('data-brochure-src'));
					img.onload = function() {
						img.removeAttribute('data-brochure-src');
					};
				});
			// }
		}
	});
	
	var galleryWaypoint = new Waypoint({
		element: document.getElementById('brochure-carousel'),
		handler: function(direction) {
			// if (direction == 'down') {
				[].forEach.call(document.querySelectorAll('img[data-gallery-src]'), function(img) {
					img.setAttribute('src', img.getAttribute('data-gallery-src'));
					img.onload = function() {
						img.removeAttribute('data-gallery-src');
					};
				});
				$('#pictures-title').find('i').css('transition', 'opacity 5s').css('opacity', '0');
			// }
		}
	});

	var AboutWaypoint = new Waypoint({
		element: document.getElementById('pictures-carousel'),
		handler: function(direction) {
			// if (direction == 'down') {
				[].forEach.call(document.querySelectorAll('img[data-about-src]'), function(img) {
					img.setAttribute('src', img.getAttribute('data-about-src'));
					img.onload = function() {
						img.removeAttribute('data-about-src');
					};
				});
			// }
		}
	})
}

// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
function mobileCheck() {
	if ( navigator.userAgent.match(/Android/i)
		 || navigator.userAgent.match(/webOS/i)
		 || navigator.userAgent.match(/iPhone/i)
		 || navigator.userAgent.match(/iPad/i)
		 || navigator.userAgent.match(/iPod/i)
		 || navigator.userAgent.match(/BlackBerry/i)
		 || navigator.userAgent.match(/Windows Phone/i)
 	   ){
    	return true;
  	}
	return false;
}

function featureAdjustments(isMobile) {
	if (!isMobile) { 
		// initial background is oversized on desktop with width <= 650px
		function resizeHeaderMobileBg(resize) {
			var el = $('#header-mobile');
			if (el.css('display') == 'block' && resize) {
				el.css('background-size', '70%');
			}
		}

		resizeHeaderMobileBg(!isMobile);
		$(window).on('resize', function() {
			resizeHeaderMobileBg(!mobileCheck());
		});
	} else {
		if ($('#header-text-wrapper').css('display') == 'inline-block') {
			$('.sy-caption-wrap').css('display', 'none');
		}
	}
}

function animationHandler() {
	window.sr = ScrollReveal();

	var titleReveal = {
		origin: 'bottom',
		distance: '40px',
		duration: 1000,
		scale: 1,
		reset: true
	}

	var cardReveal = {
		duration: 650,
		reset: true,
		scale: 0.8,
		distance: '10px'
	}

	var leftReveal = {
		scale: 1,
		duration: 1500,
		reset: true,
		origin: 'left',
		distance: '50px',
		ease: 'ease-in-out'
	}

	var rightReveal = {
		scale: 1,
		duration: 1500,
		reset: true,
		origin: 'right',
		distance: '50px',
		ease: 'ease-in-out'
	}

	var thanksReveal = {
		scale: 1,
		duration: 2000,
		reset: true,
		origin: 'bottom',
		distance: '50px'
	}

	sr.reveal('.section-title', titleReveal);
	sr.reveal('.card', cardReveal);

	sr.reveal('#foram-title', leftReveal);
	sr.reveal('#foram-content', rightReveal);
	sr.reveal('#foram-quote', leftReveal);

	sr.reveal('#juhi-title', rightReveal);
	sr.reveal('#juhi-content', leftReveal);
	sr.reveal('#juhi-quote', rightReveal);

	sr.reveal('#guru-title', leftReveal);
	sr.reveal('#guru-content', rightReveal);

	sr.reveal('#thank-you', thanksReveal);
}


//////////////
/// HEADER ///
//////////////

function expandHeader() {
	var waypoint = new Waypoint({
		element: document.getElementById('header-nav'),
		handler: function(direction) {
			if ($('#header-text-wrapper').css('display') == 'inline-block') {
				if (direction == 'down') {
					$('.alt-header-animate').css('transition', 'width 2s, opacity 7s');
					$('#alt-header-animate-left').addClass('alt-header-expand');
					$('#alt-header-animate-right').addClass('alt-header-expand');
					$('#alt-header').css('transition', 'opacity 6s').css('opacity', '1');
				} else if (direction == 'up') {
					$('.alt-header-animate').css('transition', 'width 1s, opacity 3s');
					$('#alt-header-animate-left').removeClass('alt-header-expand');
					$('#alt-header-animate-right').removeClass('alt-header-expand');
					$('#alt-header').css('transition', 'opacity 2s').css('opacity', '0');
				}
			}
		}
	});

	$(window).on('resize', function() {
		if (($(document).scrollTop() > $('#header-nav').offset().top) && ($('#header-text-wrapper').css('display') == 'inline-block')) {
			$('.alt-header-animate').css('transition', 'width 2s, opacity 7s');
			$('#alt-header-animate-left').addClass('alt-header-expand');
			$('#alt-header-animate-right').addClass('alt-header-expand');
			$('#alt-header').css('transition', 'opacity 6s').css('opacity', '1');
		}
	});

}

//////////////////////
/// ABOUT SECTIONS ///
//////////////////////

function fillBackgrounds() {
	var foram = $('#foram');
	var juhi = $('#juhi');
	var guru = $('#guru');
	var bottom = $('#footer');

	var resizeForamBg = function() {
		var foramOffset = foram.offset().top;
		var juhiOffset = juhi.offset().top;
		var guruOffset = guru.offset().top;
		var bottomOffset = bottom.offset().top;
		foram.find('.about-bg-layer')
			 .css('height', juhiOffset - foramOffset + 'px');
	}
	
	var resizeJuhiBg = function() {
		var foramOffset = foram.offset().top;
		var juhiOffset = juhi.offset().top;
		var guruOffset = guru.offset().top;
		var bottomOffset = bottom.offset().top;
		juhi.find('.about-bg-layer')
		    .css('height', guruOffset - juhiOffset + 'px');
	}

	var resizeGuruBg = function() {
		var foramOffset = foram.offset().top;
		var juhiOffset = juhi.offset().top;
		var guruOffset = guru.offset().top;
		var bottomOffset = bottom.offset().top;
		guru.find('.about-bg-layer')
		    .css('height', bottomOffset - guruOffset + 'px');
		guru.find('.about-bg')
			.css('height', bottomOffset - guruOffset + 'px');
	}

	resizeForamBg();
	resizeJuhiBg();
	resizeGuruBg();

	$(window).on('resize', function() {
		resizeForamBg();
		resizeJuhiBg();
		resizeGuruBg();
	})


}

function anchorLinkSmoothScroll() {
	// W3schools: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll
	$("a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
				}, 800, function(){
				window.location.hash = hash;
			});
		} 
	});
}

////////////////
/// SIDEBARS ///
////////////////

function initAltHeader() {
	$('#alt-header').sidr({
		name: 'alt-header-nav-sidr',
		source: '#alt-header-nav',
		onOpen: function() {
			var sidebar = $('#alt-header-nav-sidr');
			if (!sidebar.hasClass("sidr-sidebar")) {
				sidebar.addClass("sidr-sidebar");
			}
		},
		renaming: false
	});
}

function initVideoSidebar() {
	$('#videos-title').find('button').sidr({
		name: 'videos-sidr',
		source: '#videos-sidebar',
		onOpen: function() {
			var sidebar = $('#videos-sidr');
			if (!sidebar.hasClass("sidr-sidebar")) {
				sidebar.addClass("sidr-sidebar");
			}
		},
		renaming: false
	});

    $('#videos-sidr li').off().on('click', function() {
		$('#videos').find('iframe')
					.attr('src', $(this).find('a').attr('value'))
					.css('height', '65vh')
					.css('padding-bottom', '60px');
		
    	var iframe = document.getElementById('videos-embed');
		iframe.src = iframe.src;
		$('#videos-title').css('margin-bottom', '63px')
						  .find('h2').html($(this).find('a').attr('name') + ' selected.');
	
		var y = $(window).scrollTop();  //your current y position on the page
		$("html, body").animate({ scrollTop: y + 200 }, 600);
	})
}

function initOpenCloseSidebars() {
	$('#alt-header').off();
	$('#ic').on('click', function() {
		$.sidr('open', 'alt-header-nav-sidr');
	})
	$('#alt-ic').on('click', function() {
		$.sidr('close', 'alt-header-nav-sidr');
		$.sidr('close', 'videos-sidr');
	})

	$(window).on('swipe', function() {
		$.sidr('close', 'alt-header-nav-sidr');
		$.sidr('close', 'videos-sidr');
	})

	$(window).on('resize', function() {
		$.sidr('close', 'alt-header-nav-sidr');
		$.sidr('close', 'videos-sidr');
	});

	$(window).on('tap', function() {
		$.sidr('close', 'alt-header-nav-sidr');
		$.sidr('close', 'videos-sidr');
	})

	$(window).on('click', function() {
		$.sidr('close', 'alt-header-nav-sidr');
		$.sidr('close', 'videos-sidr');
	});
}

/////////////////
/// CAROUSELS ///
/////////////////

function initProgramCarousel() {
	$('#program-title').find('a').attr({
		target: '_blank',
		href: 'http://www.juhiforam.com.s3-website.us-east-2.amazonaws.com/assets/images/brochure/brochure.pdf'
	})

	var carousel = $('#brochure-carousel');
	carousel.slippry({
		slippryWrapper: '<div>',
		adaptiveHeight: true,
		captions: false,
		pager: true,
		auto: true,
		controls: true,
		autoHover: true,
		speed: 500,
		transition: 'horizontal'
	}).find('li').on('swipeleft', function() {
		carousel.goToNextSlide();
	}).on('swiperight', function() {
		carousel.goToPrevSlide();
	});

	$(window).on('resize', function() {
		carousel.refresh();
	});
}

function initPicturesCarousel() {
	var carousel = $('#pictures-carousel');
	carousel.slippry({
		transition: 'horizontal',
		pager: true,
		auto: true,
		controls: true,
		captions: 'overlay'
	}).find('li').on('swipeleft', function() {
		carousel.goToNextSlide();
	}).on('swiperight', function() {
		carousel.goToPrevSlide();
	});

	$(window).on('resize', function() {
		carousel.refresh();
	})
}
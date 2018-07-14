$(function() {
	$('.hide-until-ready').removeClass('hide-until-ready');

$(window).on('scroll', function() {
	if (document.documentElement.offsetWidth <= 650) {
		$('#collapsed-sidebar').css('opacity', '1').css('left', '0').width($('body').width());
	}
	// console.log(document.documentElement.offsetWidth);
	if (document.documentElement.offsetWidth > 650) {
		var scroll_offset = $(document).scrollTop();
		var passed = (last_scroll > nav_offset & scroll_offset < nav_offset) | (last_scroll < nav_offset & scroll_offset > nav_offset);
		last_scroll = scroll_offset;
		// console.log('scroll: ' + scroll_offset.toString());
		// console.log('nav: ' + nav_offset.toString());
		if (passed & scroll_offset < nav_offset) { 
			$('#collapsed-sidebar').animate({
	         	opacity: '0'
			}, function() {
				$('#collapsed-sidebar').css({
					width: '43%',
					left: '28%'
				})
			});


		}
		if (passed & scroll_offset > nav_offset) {
	         $('#collapsed-sidebar').animate({
	         	width: $('body').width(),
	         	left: '0',
	         	opacity: '1'
			});
		}
	}
});




	
	// animate on scroll
	AOS.init();

	$(window).on('load', function() {
  		AOS.refresh();
	});
		// brochure

	$('#brochure-carousel').slippry({
		slippryWrapper: '<div>',
		adaptiveHeight: true,
		captions: false,
		pager: true,
		auto: true,
		controls: true,
		autoHover: true,
		speed: 500,
		transition: 'horizontal',
		onSliderLoad: function() {
			AOS.refresh();
		}
	});

	// pictures

	$('#pictures-carousel').slippry({
		transition: 'horizontal',
		pager: true,
		auto: true,
		controls: true,
		onSliderLoad: function() {
			AOS.refresh();
		}
	});

	// responsiveness

	$(window).on('resize', function() {
		var docWidth = document.documentElement.offsetWidth;

		[].forEach.call(
		  document.querySelectorAll('*'),
		  function(el) {
		    if (el.offsetWidth > docWidth) {
		      console.log(el);
		    }
		  }
		);
	})

	var nav_offset = $('#header-nav').offset().top;
	var last_scroll = $(document).scrollTop();



$('#collapsed-sidebar').sidr({
	name: 'main-sidr',
	source: '#collapsed-nav'
});

    $('body').swipe({
	    //Single swipe handler for left swipes
	    swipeLeft: function () {
	        $.sidr('close', 'main-sidr');
	    },
	    swipeRight: function () {
	        $.sidr('open', 'videos-sidr');
	    },
	    //Default is 75px, set to 0 for demo so any distance triggers swipe
	    threshold: 20
    });





	// smooth scrolling

	$('.smooth').on('click', function() {
	    $.smoothScroll({
	        scrollElement: $('body'),
	        scrollTarget: '#' + this.id
	    });
	    
	    return false;
	});

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



	// videos

	$('#videos-title').find('button').sidr({
		name: 'videos-sidr',
		source: '#videos-sidebar',

	});

    $('#videos').swipe({
	    //Single swipe handler for left swipes
	    swipeLeft: function () {
	        $.sidr('close', 'videos-sidr');
	    },
	    //Default is 75px, set to 0 for demo so any distance triggers swipe
	    threshold: 20
    });

    $('body').off().on('click', function() {
    	$.sidr('close', 'videos-sidr');
    	$.sidr('close', 'main-sidr');
    })

    $('.sidr-class-fab').addClass('fab fa-youtube fa-lg');
    $('.sidr-class-fas').addClass('fas fa-graduation-cap');
    $('.sidr-class-fa-newspaper').addClass('far fa-newspaper');
    $('.sidr-class-fa-images').addClass('far fa-images');


    $('#videos-sidr li').off();

    $('#videos-sidr li').off().on('click', function() {
    	$('#videos').find('iframe').attr('src', $(this).find('a').attr('value'));
    	var iframe = document.getElementById('videos-embed');
		iframe.src = iframe.src;
    	$('#videos-title').find('h2').html($(this).find('a').attr('name') + ' selected.');
    })
});

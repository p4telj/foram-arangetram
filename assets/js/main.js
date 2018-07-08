$(function() {

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
	});

	// pictures

	$('#pictures-carousel').slippry({
		transition: 'horizontal',
		pager: true,
		auto: true,
		controls: true
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
	    swipeRight: function () {
	        $.sidr('open', 'videos-sidr');
	    },
	    //Default is 75px, set to 0 for demo so any distance triggers swipe
	    threshold: 45
    });

    $('body').off().on('click', function() {
    	$.sidr('close', 'videos-sidr');
    })

    $('.sidr-class-fab').addClass('fab fa-youtube fa-lg');

    $('#videos-sidr li').off();

    $('#videos-sidr li').off().on('click', function() {
    	$('#videos').find('iframe').attr('src', $(this).find('a').attr('value'));
    	var iframe = document.getElementById('videos-embed');
		iframe.src = iframe.src;
    	$('#videos-title').find('h2').html($(this).find('a').attr('name') + ' selected.');
    })
});

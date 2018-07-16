// Jimil Patel / Nritya Nipuna

$(function() {
	// GENERAL FEATURES
	$('.hide-until-ready').removeClass('hide-until-ready');
	initSmoothScrolling();
	initLazyLoading();

	// SIDEBARS
	initAltHeader();
	$('.sidr-sidebar li').off();
	initOpenCloseSidebars();
});

////////////////////////
/// GENERAL FEATURES ///
////////////////////////

function initSmoothScrolling() {
	// $('.smooth').on('click', function() {
	//     $.smoothScroll({
	//         scrollElement: $('body'),
	//         scrollTarget: '#' + this.id
	//     });
	//     return false;
	// });
}

function initLazyLoading() {
	[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
		img.setAttribute('src', img.getAttribute('data-src'));
		img.onload = function() {
			img.removeAttribute('data-src');
		};
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

function initOpenCloseSidebars() {
	$(window).on('click', function() {
		$.sidr('close', 'alt-header-nav-sidr');
	});

	$(window).swipe({
		swipeRight: function() {
			var windowMedia = window.matchMedia("(max-width: 650px)");
			function windowSidr(x) {
				// alt-header-nav-sidr open functionality by swiping right is disabled
				// if viewport is too large
				if (x.matches) {
					$.sidr('open', 'alt-header-nav-sidr');
				}
			}
			windowSidr(windowMedia);
			windowMedia.addListener(windowSidr);
		},
		swipeLeft: function() {
			$.sidr('close', 'alt-header-nav-sidr');
		},
		threshold: 20
	});

	$(window).on('resize', function() {
		$.sidr('close', 'alt-header-nav-sidr');
	})
}

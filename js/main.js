(function ($) {
	"use strict";

	$(window).stellar({
		responsive: true,
		parallaxBackgrounds: true,
		parallaxElements: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		scrollProperty: 'scroll'
	});

	getCategories();

	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function () {
		setTimeout(function () {
			if ($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function () {
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			autoplay: true,
			autoplaySpeed: 2000,
			items: 1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function () {
		var $this = $(this);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');
	}, function () {
		var $this = $(this);
		$this.removeClass('show');
		$this.find('> a').attr('aria-expanded', false);
		$this.find('.dropdown-menu').removeClass('show');
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
		console.log('show');
	});

	// scroll
	var scrollWindow = function () {
		$(window).scroll(function () {
			var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.ftco_navbar'),
				sd = $('.js-scroll-wrap');

			if (st > 150) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}
			}
			if (st < 150) {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('scrolled sleep');
				}
			}
			if (st > 350) {
				if (!navbar.hasClass('awake')) {
					navbar.addClass('awake');
				}

				if (sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if (st < 350) {
				if (navbar.hasClass('awake')) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if (sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var counter = function () {

		$('#section-counter, .wrap-about, .ftco-counter').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function () {
					var $this = $(this),
						num = $this.data('number');
					$this.animateNumber(
						{
							number: num,
							numberStep: comma_separator_number_step
						}, 7000
					);
				});

			}

		}, { offset: '95%' });

	}
	counter();


	var contentWayPoint = function () {
		var i = 0;
		$('.ftco-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .ftco-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '95%' });
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});

	$('[data-toggle="popover"]').popover()
	$('[data-toggle="tooltip"]').tooltip()

})(jQuery);

function changeSection(title) {
	var drinkTitle = $('#drinkTitle');
	var articles = $('#Articles');
	drinkTitle.html(title);
	articles.html(`<div class="loader"></div>`);

	$.ajax({
		type: 'GET',
		url: 'https://argsemueve.com/app.php/wines/' + title,
		dataType: 'json',
		encode: true,
		success: function (data) {
			if (data != 0) {
				articles.html("");
				data.forEach(element => {
					if (element.sale == true) {
						articles.append(`
					<div class="col-md-3 d-flex">
						<div class="product">
								<div class="img d-flex align-items-center justify-content-center" style="background-image: url(` + element.image + `);">
								</div>
							<div class="text text-center">
								<span class="sale">¡Oferta!</span>
								<h2>` + element.name + `</h2>
								<h2 style="color: #963821; font-size: 17px;">` + element.description + `</h2>
								<span class="price">` + (element.price == 0 ? "Agotado" : "$" + element.price) + `</span>
							</div>
						</div>
					</div>
				`);
					}
					else {
						articles.append(
							`
			 <div class="col-md-3 d-flex">
				 <div class="product">
						 <div class="img d-flex align-items-center justify-content-center" style="background-image: url(` + element.image + `);">
						 </div>
					 <div class="text text-center">
						 <h2>` + element.name + `</h2>
						 <h2 style="color: #963821; font-size: 17px;">` + element.description + `</h2>
							<span class="price">` + (element.price == 0 ? "Agotado" : "$" + element.price) + `</span>
					 </div>
				 </div>
			 </div>
		 `
						);
					}
				});
			}
			else {
				articles.html('<div class="alert alert-success">' + "No hay artículos cargados." + '</div>');
			}

		},
		error: function (data) {
			articles.html('<div class="alert alert-success">' + "Error." + '</div>');
		}
	});
}

function getCategories() {
	var drinkTitle = $('#drinkTitle');
	var categories = $('#categories');

	$.ajax({
		type: 'GET',
		url: 'https://argsemueve.com/app.php/categories/',
		dataType: 'json',
		encode: true,
		success: function (data) {
			if (data != 0) {
				drinkTitle.html(data[0].name);
				var firstTitle = data[0].name;
				data.forEach(element => {
					categories.append(`
					<div class="col-lg-3 col-md-4 " style="cursor: pointer;" onclick="changeSection('` + element.name + `')">
						<div class="sort w-100 text-center ftco-animate fadeInUp ftco-animated">
							<div class="img" style="background-image: url(images/kind-6.jpeg);"></div>
							<h3>` + element.name + `</h3>
						</div>
					</div>
				`);
				});

				changeSection(firstTitle);
			}
			else {
				categories.html('<div class="alert alert-success">' + "No hay artículos cargados." + '</div>');
			}

		},
		error: function (data) {
			categories.html('<div class="alert alert-success">' + "Error." + '</div>');
		}
	});

	return "Sin categorías";
}

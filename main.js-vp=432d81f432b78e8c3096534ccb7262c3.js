(function(){
	function on_resize() {
		if( $(window).width() <= 780 ) {
			window.location = 'mobile/index.html';
		}

	}
	on_resize();
})();

$(document).ready(function() {

	// preloader
	if( $(window).width() > 780){
		
		document.getElementById("viewport").setAttribute("content", "width=1280, user-scalable=no");

		window.setTimeout(function () {
			$('.preloader').fadeOut(function(){
				$('.body').removeClass('loading');
				$(window).trigger('onQueryLoaderLoaded');

				// animate main titles
				// $('.js-animate-name1').removeClass('animate-name1');
				// $('.js-animate-title1').removeClass('animate-title1');
				// $('.js-animate-subtitle1').removeClass('animate-subtitle1');
			});
		}, 5600);

		window.setTimeout(function () {
			initFullpage();
		}, 5000);
	} else {
		$('.preloader').hide();
	}



	window.isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) window.isMobile = true;

	if(window.isMobile){
		$('html').addClass('mobile');
	} else {
		$('html').addClass('desktop');
	}

	$('.section-form .js-submit-form').val('Заказать звонок');

	// set class to html for OS
	if (navigator.userAgent.indexOf ('Windows') != -1) {
		$('body').addClass('windows');
	} else if (navigator.userAgent.indexOf ('Mac') != -1) {
		$('body').addClass('macos');
	}

	// Video end event listener
	var video_dima_ended = false;
	var video_dima = document.getElementById("video-dima");
	if (video_dima) {
		video_dima.addEventListener('ended', function () {
			video_dima_ended = true;

			/*
			$('#video-dima').css('display', 'none');
			$('#video-dima-cycle').css('display', 'block');
			$('#video-dima-cycle')[0].play();
			*/
		});
	}

	function initFullpage () {
		$('#fullpage').fullpage({
			keyboardScrolling: true,

			css3: true,
			scrollingSpeed: 800,

			onLeave: function (index, nextIndex, direction) {
				var scale_slide = $('[data-screen="' + index + '"]').find('.scale-wrapper'),
					new_slide = $('[data-screen="' + nextIndex + '"]'),
					anim_remove = 700;

				scale_slide.addClass('slide-scroll');

				if ( nextIndex === 2 ){
					window.setTimeout(function () {
						$('.js-animate-name1').removeClass('animate-name1');
						$('.js-animate-title1').removeClass('animate-title1');
						$('.js-animate-subtitle1').removeClass('animate-subtitle1');
					}, 300);
				}


				if (nextIndex === 4) {

					if( !$('.section-numbers').hasClass('animated') ){
						window.setTimeout(function () {

							$('.section-numbers').addClass('animated');

							$('.js-number').each(function () {
								var item = $(this);
								item.animate({
									num: parseInt(item.data('amount'))
								}, {
									duration: 900,
									step: function (now, fx) {
										item.html(number_format(now, 0, '.', ' '));
									},
									complete: function () {
										item.addClass('animate-zoom');
									}
								});
							});

						}, 200);
					}

				}

				if (nextIndex === 2) {
					window.setTimeout(function () {
						$('.js-animate-title2').removeClass('animate-title2');
						$('.js-animate-subtitle2').removeClass('animate-subtitle2');

						window.setTimeout(function () {
							$('.js-animate-button2').removeClass('animate-button2');
							$('.videobutton-icon').addClass('videobutton-icon-show');
							$('.videobutton-look').addClass('videobutton-look-show');
							$('.videobutton-time').addClass('videobutton-time-show');
						},1000);

						window.setTimeout(function () {
							$('.videobutton-icon').removeClass('videobutton-icon-show').addClass('videobutton-icon-pulsation');
						}, 5000);

					}, 2000);
				}

				if ( nextIndex === 4 ){
					window.setTimeout(function () {
						$('.js-animate-stats').removeClass('animate-stats');
					}, 600);
				}

				if ( nextIndex === 5 ){
					window.setTimeout(function () {
						$('.js-animate-title4').removeClass('animate-title4');
						$('.js-animate-subtitle4').removeClass('animate-subtitle4');
						$('.js-animate-videos4').removeClass('animate-videos4');
					}, 100);
				}


				if ( nextIndex === 6 ){
					window.setTimeout(function () {
						$('.js-animate-title5').removeClass('animate-title5');
						$('.js-animate-subtitle5').removeClass('animate-subtitle5');
						$('.js-animate-text5').removeClass('animate-text5');
					}, 300);
				}

				if ( nextIndex === 7 ) {
					window.setTimeout(function () {
						new firePoints();
					}, 300);
				}

				if ( nextIndex === 7 ){  //map izmenil 7 na 6
					window.setTimeout(function () {
						$('.js-animate-title7').removeClass('animate-title7');
						$('.js-animate-subtitle7').removeClass('animate-subtitle7');
						$('.js-animate-slider7').removeClass('animate-slider7');
						$('.js-animate-count7').removeClass('animate-count7');
					}, 300);
				}

				if ( nextIndex === 7 ){  //map izmenil 7 na 6
					window.setTimeout(function () {
						$('.js-animate-title7').removeClass('animate-title7');
						$('.js-animate-subtitle7').removeClass('animate-subtitle7');
						$('.js-animate-button7').removeClass('animate-button7');
					}, 100);
				}

				if( nextIndex === 9 ){
					$('.button-menu').addClass('move-top');
				} else {

					$('.button-menu').removeClass('move-top');
				}

				$('.block-nav .active').removeClass('active');
				$('[data-index="' + nextIndex + '"]').addClass('active');

				$('body').removeClass('up down').addClass(direction);



				//slideAnimate(index);
			},
			onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
			},

			afterLoad: function (anchorLink, index) {

				/*
				 if (index === 1) {
				 var video = $('.js-video-top')[0];
				 if (video) {
				 playVideo(video);
				 }
				 } else {
				 var video = $('.js-video-top')[0];
				 if (video) {
				 playVideo(video);
				 video.pause();
				 }
				 }
				 */

				if (index === 3) {
					var video = $('.js-video-dima')[0];
					if (video) {
						if (video_dima_ended) return;
						//$('.js-video-dima')[0].currentTime = 0.5;
						playVideo(video);

						//$('.js-video-dima')[0].play();
					}
				} else {
					var video = $('.js-video-dima')[0];
					if (video) {
						video.pause();

						//$('.js-video-dima')[0].currentTime = 0;
					}
				}

				/*
				 if (index === 3) {
				 var video = $('.js-video-3')[0];
				 if (video) {
				 playVideo(video);
				 }
				 }
				 else {
				 var video = $('.js-video-3')[0];
				 if (video) {
				 playVideo(video);
				 video.pause();
				 }
				 }
				 */

				/*
				 if (index === 5) {
				 var video = $('.js-video-map')[0];
				 if (video) {
				 playVideo(video);
				 }
				 }
				 else {
				 var video = $('.js-video-map')[0];
				 if (video) {
				 video.pause();
				 }
				 }
				 */

				/*
				 if (index === 7) {
				 var video = $('.js-video-partners')[0];
				 if (video) {
				 playVideo(video);
				 }
				 }
				 else {
				 var video = $('.js-video-partners')[0];
				 if (video) {
				 video.pause();
				 }
				 }
				 */
			},
			afterRender: function () {
				$.fn.fullpage.setAllowScrolling(false);
			}
		});
	}


	// navigation to section
	$('.block-nav li').click(function () {
		var index = $(this).data('index');
		$.fn.fullpage.moveTo(index);
	});

	// ScrollTo navigation
	$('.scroll-down').click(function () {
		$.fn.fullpage.moveSectionDown();
	});

	$('.logo').on('click', function () {
		$.fn.fullpage.moveTo(1);
		return false;
	});


	// Partners slider
	function PartnerSlider() {
		var slider = $('.js-partner-slider');
		var slides = $('.js-partner-slider .partner-slide');

		function totalCount() {
			var total = slides.length;
			$('.section-partners .all').html(total);
		}

		function initSlider() {
			$('.section-partners .slider').slick({
				speed: 700,
				fade: true,
				prevArrow: $('.section-partners .js-slide-prev'),
				nextArrow: $('.section-partners .js-slide-next')
			})
				.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
					$('.section-partners .of').empty().append(nextSlide + 1);
				});
		}

		// animation
		$('.section-partners').on('mouseenter', '.slide-next', function () {
			slider.removeClass('animation prev-animation next-animation').addClass('next-animation');
			window.setTimeout(function () {
				slider.addClass('animation');
			}, 50);

		});
		$('.section-partners').on('mouseenter', '.slide-prev', function () {
			slider.removeClass('animation prev-animation next-animation').addClass('prev-animation');
			window.setTimeout(function () {
				slider.addClass('animation');
			}, 50);
		});

		this.init = function () {
			totalCount();
			initSlider();
		};
	}
	var partnerslider = new PartnerSlider();
	partnerslider.init();

	// slider videos transformator
	var len1 = $('.js-videos-transformator .video-slide').length;
	$('.js-videos-transformator  .all').html(len1);
	$('.js-videos-transformator .slider-videos').slick({
		speed: 700,
		slidesToShow: 5,
		slidesToScroll: 1,
		touchThreshold: 10,
		//swipe: false,
		prevArrow: $('.js-videos-transformator .js-slide-prev'),
		nextArrow: $('.js-videos-transformator .js-slide-next')
	})
		.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			$('.js-videos-transformator .of').empty().html(nextSlide + 1);
		});

	// slider videos other
	var len2 = $('.js-videos-other .video-slide').length;
	$('.js-videos-other  .all').html(len2);
	$('.js-videos-other .slider-videos').slick({
		speed: 700,
		slidesToShow: 5,
		slidesToScroll: 2,
		touchThreshold: 10,
		//swipe: false,
		prevArrow: $('.js-videos-other .js-slide-prev'),
		nextArrow: $('.js-videos-other .js-slide-next')
	})
		.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			$('.js-videos-other .of').empty().html(nextSlide + 1);
		});

	$('.section-company').on('click', '.js-video-button', function () {
		// pause bg video dima
		var video = $('.js-video-dima')[0];
		if (video) {
			video.pause();
		}
	});
	$('.js-close-popup').click(function () {
		// play bg video dima
		if (video_dima_ended) return;
		var video = $('.js-video-dima')[0];
		if (video) {
			playVideo(video);
		}
	});

	function Popup () {

	    var self = this;

	    this.openPopup = function () {
            $('.js-popup').removeClass('hide').addClass('show');
			$.fn.fullpage.setAllowScrolling(false);
        };
		this.closePopup = function () {
			$('.js-popup').removeClass('show');

			window.setTimeout(function () {
				$('.js-popup').addClass('hide');
				$('.js-popup-video').html('')
				$.fn.fullpage.setAllowScrolling(true);
            }, 300);
		};

		$('.js-close-popup').click(function () {
			self.closePopup();
        });

		$('.section-video, .section-company, .section-geography').on('click', '.js-video-button', function () {
			var video = $(this).data('video');
			if(video){
				$('.js-popup-video').html('<iframe src="' + video + '?autoplay=1&color=cc1d1d" frameborder="0" allowfullscreen></iframe>');
				popup.openPopup();
			}
		});

		$(document).mouseup(function (e) {
		    if( !$('.js-popup').hasClass('show') ) return;
		    if( !$('.popup').is(e.target) && $('.popup').has(e.target).length === 0 ) {
		        self.closePopup();
            }
        });
	}
	var popup = new Popup ();

	$('.tab-btns div').click(function(){
		if (!($(this).hasClass('active'))){

			var elm = $('.tab-content'),
				thisel = $(this);

			thisel.parent().find('.active').removeClass('active');
			thisel.addClass('active');
			elm.stop().animate({
				num: parseInt(thisel.attr('data-amount'))
			},{
				duration : 500,
				step : function(now, fx){
					elm.html( number_format(now,0,'.',' ') );
				}
			});
		} else {
			return;
		}
	});

	$('.scrollable').scroll(function () {
		var scrolltop = $('.scrollable').scrollTop();
		var scrollable = $('.scrollable')[0].scrollHeight - $('.scrollable').height();
		var k = scrolltop/scrollable;
		$('.custom-scroll').css('top', $('.scrollable').height()*k);
		$('.custom-thumb').css('top', 50*(1-k)+'%');
	});

	function callbackSwitcher () {
		var checked = $('.js-switcher').hasClass('checked');
		if ( checked ){
			$('.section-video').removeClass('transformator').addClass('other');
		} else {
			$('.section-video').removeClass('other').addClass('transformator');
		}
	}
	$('.js-switcher').on('click', '.js-switch', function () {
		if($(this).hasClass('active')) return;
		$('.js-switcher .js-switch').removeClass('active');
		$(this).addClass('active');
		$('.js-switcher').toggleClass('checked');
		callbackSwitcher();
	});
	$('.js-switcher').on('click', '.js-switch-icon', function () {
		$('.js-switcher').toggleClass('checked');
		$('.js-switcher .js-switch').toggleClass('active');
		callbackSwitcher();
	});

	if(window.isMobile){
		$('.button-menu').addClass('animate-mobile');
	} else {
		$('.button-menu').on('mouseenter', function () {
			$('.button-menu').addClass('animate');
		}).on('mouseleave', function () {
			$('.button-menu').removeClass('animate');
		});
	}

});

function playVideo(video) {
	if (video) {
		video.autoplay = true;
		var p = video.play();
		if (p && (typeof Promise !== 'undefined') && (p instanceof Promise)) {
			p.catch(function (e) {
				console.log(e);
			});
		}
	} else {
		playOnceInitialized = true;
	}
}

function number_format( number, decimals, dec_point, thousands_sep ) {
	var i, j, kw, kd, km;

	// input sanitation & defaults
	if( isNaN(decimals = Math.abs(decimals)) ){
		decimals = 2;
	}
	if( dec_point == undefined ){
		dec_point = ",";
	}
	if( thousands_sep == undefined ){
		thousands_sep = ".";
	}

	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

	if( (j = i.length) > 3 ){
		j = j % 3;
	} else{
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	//kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


	return km + kw + kd;
}




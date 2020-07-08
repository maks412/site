(function ($) {

	(function(){
		function on_resize() {
			if( window.innerWidth > 780 ) {
				window.location = '../index.htm'+ window.location.search;
			}
		}
//			$(window).resize(on_resize);
		on_resize();
	})();

    $('.section-header').height($(window).height());
    $('.main').addClass('show');

    $('.menu-block li a').each(function () {
        $(this).attr('href', ('/mobile' + $(this).attr('href')) );
    });

    window.setTimeout(function () {
		$('.section-header video, .section-company video').each(function () {
			enableInlineVideo(this);
		});
	},1000);

    $('.menu-trigger').click(function(){

        if ($(this).hasClass('active')) {

            $(this).removeClass('active');
            $('.main-wrapper, .form-block, .menu-block, .static-elements .menu-trigger, .static-elements .js-socials').removeClass('menu-open');
            $('.menu-trigger .not-open').removeClass('hide');

			window.mainscroll.enableScroll();

        } else {

            $(this).addClass('active');
            $('.main-wrapper, .menu-block, .static-elements .menu-trigger, .static-elements .js-socials').addClass('menu-open');
            $('.menu-trigger .not-open').addClass('hide');

            window.mainscroll.disableScroll();
        }

    });

	function callbackSwitcher(){
		var checked = $('.js-switcher-videos').hasClass('checked');
		if( checked ) {
			$('.section-video .videos-container').addClass('other').removeClass('transformator');
		} else {
			$('.section-video .videos-container').addClass('transformator').removeClass('other');
		}
	}
	$('.js-switcher-videos').on('click', '.js-switch', function () {
		if($(this).hasClass('active')) return;
		$('.js-switcher-videos .js-switch').removeClass('active');
		$(this).addClass('active');
		$('.js-switcher-videos').toggleClass('checked');
		callbackSwitcher();
	});
	$('.js-switcher-videos').on('click', '.js-switch-icon', function () {
		$('.js-switcher-videos').toggleClass('checked');
		$('.js-switcher-videos .js-switch').toggleClass('active');
		callbackSwitcher();
	});


	// button logic
    var body = $('body');
	var scrolltop = $(window).scrollTop();
	var offsetCallback = $('.slider-partners').offset().top - 40;
    $(window).scroll(function(e){
        scrolltop = $(window).scrollTop();
        if(scrolltop > 0){
            body.addClass('scroll-not-null');
        } else {
            body.removeClass('scroll-not-null');
        }
        if( scrolltop > offsetCallback ){
        	body.addClass('callback-scrolled');
		} else {
			body.removeClass('callback-scrolled');
		}
    });


	$(document).scroll(function(e){
		scrolltop = $(window).scrollTop();

		// button
		var pos = scrolltop-100;
		if(pos<0) pos = 0;
		if( pos>30 ) pos = 30;

		$('.open-form-button').css({'top': 30-pos, 'right': 30-pos});
		$('.open-form-button .text').css({'opacity': 1-pos/30, 'top': -0.8*pos});


	});

    $('.slider-mobile').slick({
        speed: 400,
        infinite: false,
        dots: false,
        prevArrow: false,
        nextArrow: false,
        slidesToShow: 3,
        touchThreshold: 20
    });

    // scroll first screen by trigger
    $('.scroll-down').click(function(){
        var body = $("html, body");
        body.stop().animate({scrollTop: $(window).height()}, 700);
    });

    var body = $("html, body");
    // $(".section-header").touchwipe({
    //     wipeUp: function() {
    //         body.stop().animate({scrollTop: 0}, 700);
    //     },
    //     wipeDown: function() {
    //         body.stop().animate({scrollTop: $(window).height()}, 700);
    //     },
    //     min_move_x: 20,
    //     min_move_y: 20,
    //     preventDefaultEvents: true
    // });


    window.mainscroll = new MainScroll ();

    // youtube video
	function showVideo (video) {
		$('.video-popup').addClass('show');
		window.player.loadVideoById(video);
		window.setTimeout(function () {
			$('.video-popup').addClass('animate');
		}, 300);

	}
	window.closeVideo = function () {
		player.stopVideo();
		$('.video-popup').removeClass('animate');
		window.setTimeout(function () {
			$('.video-popup').removeClass('show');
		}, 300);
	};

	$(document).on('click', '.close-video', function (){
		window.closeVideo();
	});

	$(document).on('click', '.js-video', function () {
		var video = $(this).data('video');
		showVideo(video);
	});
	$('.js-projects').on('click', '.video', function () {
		var video = $(this).data('video').replace('https://www.youtube.com/embed/','');
		showVideo(video);
	});

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

	$('.section-form .js-submit-form').val('Заказать звонок');

})(jQuery);

// youtube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = function () {
	window.player = new YT.Player('player', {
		'videoId': '',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		},
		playerVars: {
			'showinfo': 0
		}
	});
};

onPlayerReady = function (event) {
	event.target.playVideo();
};

onPlayerStateChange = function (event) {
	if (event.data == YT.PlayerState.PAUSED) {
		window.closeVideo();
	}
};

stopVideo = function () {
	player.stopVideo();
};

function MainScroll () {
	this.enableScroll = function () {
        var scrolltop = -1*parseInt($('.main').css('top').replace('px', '')) || $(window).scrollTop();
        $('html').removeClass('disable-scroll');
        $('.main').css('top', 0);
        $(window).scrollTop(scrolltop);
	};
	this.disableScroll = function () {
        var scrolltop = $(window).scrollTop();
        $('.main').css('top', -1*scrolltop);
        $('html').addClass('disable-scroll');
	};
}


function number_format( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands
    //
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +	 bugfix by: Michael White (http://crestidg.com)

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




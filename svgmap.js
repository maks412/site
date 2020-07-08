
function Map() {

	var self = this;

	$(window).load(function () {
		var svgmap = document.getElementById("map");

		self.svgDoc = svgmap.contentDocument;
		self.svgRoot = self.svgDoc.documentElement;

		// append points
		appendPoints();


	});

	function appendPoints(){
		var html = '';
		$('#map .active', self.svgRoot).each(function () {
			var translate = convertTranslate($(this).attr('transform'));

			// var point_index = $(this).closest('g').index();
			//console.log($(this).closest('g').attr('id'));
			var point_id = $(this).closest('g').attr('id');
			html += '<div class="point-position" style="transform: ' + translate + '" data-translate="' + translate + '"><div class="point-offset"><div class="point point-trigger" data-id="' + point_id + '"></div></div></div>';

		});
		$('.js-points').html(html);
	}

	function convertTranslate(transform) {
		var nums = transform.replace(" ", ",").replace('translate(', '').replace(')', '').split(',');
		var x = parseFloat(nums[0]);
		var y = parseFloat(nums[1]);
		x = x / 10.42;
		y = y / 6.63;

		return 'translate(' + x + '%,' + y + '%' + ')';
		//return 'translate(' + Math.round(x*($(".map-overlay").width()/100)) + 'px,' + Math.round(y*($(".map-overlay").height()/100)) + 'px' + ')';
	}

	function buildPopup(obj) {

		// ajax request data
		//console.log(obj.data('id'));

		var orientation = '';
		var translate = obj.closest('.point-position').data('translate');
		var translate_y = parseFloat(translate.split(',')[1].replace(')', '').replace('%', ''));
		var y = translate_y + 35;
		var window_height = $(window).height();
		var top_space_percent = 100 * 200 / window_height;

		if (y < top_space_percent) {
			orientation = 'map-label-bottom';
		} else {
			orientation = 'map-label-top';
		}

		var html = '';
		var video = '';
		$.ajax({
			url: 'http://www.transformator.tv/public/get_point.json',
			method: "POST",
			data: {svg_id: obj.data('id')},
			dataType: "json",
			async: false,
			success: function (data, textStatus, xhr) {
				if (xhr.status == 200) {

					//console.log(data);
					if(!data.image){
						data.image = 'map-image-1.jpg'/*tpa=http://www.transformator.tv/assets/public/images/map-image-1.jpg*/;
					}else{
						data.image = '/uploads/files/map/' + data.image;
					}

					video += '<video style="height: 100%; position: absolute; bottom: -1px;" loop muted="muted" autoplay' + ( data.image ? ' poster="'+data.image+'"' : '' ) + '>';
					if( data.video_webm ) { video += '	<source src="/uploads/files/map/' + data.video_webm + '" type="video/webm" />'; }
					if( data.video_mp4 ) { video += '	<source src="/uploads/files/map/' + data.video_mp4 + '" type="video/mp4" />'; }
					if( data.video_ogv ) { video += '	<source src="/uploads/files/map/' + data.video_ogv + '" type="video/ogv" />'; }
					video += '</video>';

					html = '<div class="map-label animate-map-label js-animate-map-label ' + orientation + ' label-1">';
					html += '       <div class="wrapper">';
					html += '           <div class="map-image" style="position: relative; overflow: hidden; background: url(' + data.image + ') no-repeat center; background-size: cover; background-position: 0 1px;">';

					if (data.video_mp4 || data.video_webm || data.video_ogv) {
						html += video;
					} else if(data.image) {
						//html += '  <img src="'+data.image+'">';
					}else{
						//html += '  <img src="map-image-1.jpg"/*tpa=http://www.transformator.tv/assets/public/images/map-image-1.jpg*/>';
					}

					html += '           </div>';
					html += '           <div class="map-text">';
					html += '           <div class="city">' + data.city + '</div>';
					html += '               <div class="country">' + data.country + '</div>';
					html += '           </div>';
					html += '           <div class="map-angle"></div>';
					html += '       </div>';
					html += '   </div>';

				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				if (xhr.status != 200) {
				}
			}
		});
		//console.log(html);
		return html;

	}


		$('.js-points').on('mouseenter', '.point-trigger', function (e) {

			var id = $(this).data('id');
			var obj = $('#' + id);


			var w = $(window).width();
			if( $(window).width < 1250 ) w = 1250;

			var left = Math.round($(this).offset().left + $(this).width()/2 - 2*w/100 + 4);
			var top = Math.round($(this).offset().top + $(this).height()/2 - 2*$(window).height()/100 + 4);

			$('#map-label-container').css({'left': left-4, 'top': top+30, 'display': 'block'});

			window.setTimeout(function () {
				obj.addClass('show').find('.map-video').css('background-position', 'center');
			},1);

			window.setTimeout(function () {
				var video = '';
				video += '<video style="min-width: 100%; min-height: 100%; width: auto; height: auto; position: absolute;" loop muted="muted" autoplay' + ( obj.data('poster') ? ' poster="' + obj.data('poster') + '"' : '' ) + '>';
				if( obj.data('webm') ) { video += '	<source src="' + obj.data('webm')+ '" type="video/webm" />'; }
				if( obj.data('mp4') ) { video += '	<source src="' + obj.data('mp4') + '" type="video/mp4" />'; }
				if( obj.data('ogv') ) { video += '	<source src="' + obj.data('ogv') + '" type="video/ogv" />'; }
				video += '</video>';

				obj.find('.map-video').html(video).css('background-position', 'center 1000px');


			}, 300);

		}).on('mouseleave', '.point-trigger', function () {

			$('.map-label').removeClass('show').find('.map-video').html('');
			$('#map-label-container').css({'display': 'none'});

		});

		/*.on('mouseleave', '.point-trigger', function (e) {

			if( $(document).find('.map-label:hover').length > 0 ) {
			 	return;
			}

			$('.map-label').removeClass('show');
			$('#map-label-container').css({'display': 'none'});
		});*/


}

// light dots

function firePoints() {

	var N = $('.point-trigger').length - 1;
	var points = range(0, N - 1);
	points = shuffle(points);

	function range(start, end) {
		var foo = [];
		for (var i = start; i <= end; i++) {
			foo.push(i);
		}
		return foo;
	}

	if (points.length > 0) {
		pointFire();
	}

	function pointFire() {
		window.setTimeout(function () {
			if (points.length > 0) {
				var point = points.pop();
				$('.point-trigger').eq(point).addClass('active').addClass('animate');
				pointFire();
			}
		}, 30);
	}

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
}


window.map = new Map();

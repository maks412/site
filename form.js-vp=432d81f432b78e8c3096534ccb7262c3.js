$(function () {

	$('.callback').submit(function (e) {
		submit_form($(this));
		e.preventDefault();
	});

	var phone = $('[name="phone"]'),
		input = $('input[type="text"], textarea');



	phone.click(function () {
		$(this).parent().removeClass('error');
		if ($(this).val().length == 0) {
			$(this).val('+');
		}
	});
	phone.focusout(function () {
		if ($(this).val().length < 2) {
			$(this).val('');
		}
	});

	phone.bind("change keyup input click", function() {
		if (this.value.match(/[^0-9+ ]/g)) {
			this.value = this.value.replace(/[^0-9+ ]/g, '');
		}
	});

	input.focus(function () {
		$(this).parent().removeClass('error');
		$(this).parent().find('span').addClass('focused');
	});
	input.focusout(function(){
		if ($(this).val() == ''){
			$(this).parent().find('span').removeClass('focused');
		}
	});

	function validateEmail(form) {
		var email = form.find('[name="email"]');
		var re = /.+@.+\..+/g;
		if( re.test(email.val()) || email.val() === ""){
			return true;
		} else {
			email.closest('.input').addClass('error');
			return false;
		}
	}
	function hasErrors (form) {
		var required = form.find('.required');
		var has_errors = false;
		required.each(function(){
			if(!$(this).find('input').val()){
				$(this).addClass('error');
				has_errors = true;
			}
		});
		return has_errors;
	}


	function submit_form(form) {

		//console.log('form init' + form);


		if( hasErrors(form) || !validateEmail(form)){
			return false;
		}

		// $.ajax({
		// 	url: form.attr('action'),
		// 	method: "POST",
		// 	dataType: "json",
		// 	async: true,
		// 	data: form.serialize() + (typeof window.random_value !== 'undefined' && window.random_value ? '&random_value=' + window.random_value : ''),
		// 	success: function (data, textStatus, xhr) {
		// 		if (xhr.status == 200) {
		// 			//success
		// 			mainform.callback();
		// 		}
		// 	},
		// 	error: function (xhr, ajaxOptions, thrownError) {
		// 		if (xhr.status != 200) {
		// 			//error
		// 		}
		// 	}
		// });



		$.ajax({
			url: "https://formspree.io/galiev-maksat@mail.ru",
			method: "POST",
			dataType: "json",
			async: true,
			data: form.serialize() + (typeof window.random_value !== 'undefined' && window.random_value ? '&random_value=' + window.random_value : ''),
			success: function (data, textStatus, xhr) {
				if (xhr.status == 200) {
					//success
					mainform.callback();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				if (xhr.status != 200) {
					//error
				}
			}
		});


	}

	function Form () {


		$(document).on('click', ' .button-menu, .button-band, .click_div', function(){

			if(!$(this).hasClass('active')){
				// $(this).addClass('active');
				showFormBox();
				openFormPanel();
				$('.button-menu').addClass('active');
			} else {
				$(this).removeClass('active');
				closeFormPanel();
			}

		});

		$('.main-wrapper').on('click' , function () {
			if(!$('.button-menu').hasClass('active')) return;
			$('.button-menu').removeClass('active');
			closeFormPanel();
		});

		$(document).on('click', '.js-close-form-panel-submited', function () {
			resetForm();
			closeFormPanel();
		});

		function openFormPanel () {
			$('body').addClass('form-panel-opened form-panel-close-callback');
			$.fn.fullpage.setAllowScrolling(false);
		}
		function closeFormPanel () {
			$('body').removeClass('form-panel-opened');
			$('.button-menu').removeClass('active');
			window.setTimeout(function () {
				$('body').removeClass('form-panel-close-callback');
				$.fn.fullpage.setAllowScrolling(true);
			}, 700);
		}

		function showAgreeBox () {
			$('.form .agreement-box').addClass('show');
			$('.form .form-box').removeClass('show');
			$('.form .thank-box').removeClass('show');
			$('.agreement .scrollable').scrollTop(0);
		}
		function showFormBox () {
			$('.form .agreement-box').removeClass('show');
			$('.form .form-box').addClass('show');
			$('.form .thank-box').removeClass('show');
		}
		function showThankBox () {
			$('.form .agreement-box').removeClass('show');
			$('.form .form-box').removeClass('show');
			$('.form .thank-box').addClass('show');
		}

		function agreeYes(){
			if($('body').hasClass('fp-viewing-7')){
				closeFormPanel();
			} else {
				showFormBox();
			}
			$('.js-submit-form').removeClass('disabled');
			$('.check-agree').prop('checked', true);
		}
		function agreeNo(){
			if($('body').hasClass('fp-viewing-7')){
				closeFormPanel();
			} else {
				showFormBox();
			}
			$('.js-submit-form').addClass('disabled');
			$('.check-agree').prop('checked', false);
		}


		$('.form').on('click', '.js-agree-text', function () {
			showAgreeBox();
			openFormPanel();
			return false;
		});

		$('.form').on('click', '.js-no-agree', function () {
			agreeNo();
			return false;
		});


		$('.form').on('click', '.js-yes-agree', function () {
			agreeYes();
			return false;
		});

		$('.check-agree').change(function() {
			var form = $(this).closest('.form');
			if($(this).is(":checked")) {
				form.find('.js-submit-form').removeClass('disabled');
			} else {
				form.find('.js-submit-form').addClass('disabled');
			}
			//form.find('.textbox').val($(this).is(':checked'));
		}).mouseover(function () {
			$(this).addClass('hover');
		}).mouseout(function () {
			$(this).removeClass('hover');
		});

		// no agree -> no submit
		$('.form').on('click', '.js-submit-form', function () {
			var form = $(this).closest('.form');
			var agree = form.find('.check-agree').prop('checked');
			if(!agree) return false;
		});

		function resetForm () {
			$('.form input[type="text"], .form textarea').each(function () {
				$(this).val('');
			});
			$('.form .placeholder').removeClass('focused');

			/*$('.js-submit-form').addClass('disabled');
			$('.form input[type="checkbox"]').each(function(){
				$(this).prop('checked', false);
			});*/
		}

		this.callback = function () {

			showThankBox();
			openFormPanel();

			$.fn.fullpage.setAllowScrolling(false);

			/*
			 if( fullpage_block ){
			 $('.form-box').removeClass('show');
			 $('.thank-box').addClass('show');
			 } else {
			 $('.form .agreement-box').removeClass('show');
			 $('.form .thank-box').addClass('show');

			 openFormPanel();
			 }
			 */
		}
	}
	var mainform = new Form ();
});




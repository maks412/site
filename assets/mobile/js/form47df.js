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

		$.ajax({
			url: form.attr('action'),
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

		$(document).on('click', ' .js-open-form-panel', function(){

			var body = $("html, body");
			body.stop().animate({scrollTop: ($('.section-form').offset().top-20)}, 1000, 'swing');

			//showFormBox();
			//openFormPanel();
		});
		$(document).on('click', '.js-close-form-panel', function () {
			closeFormPanel();
		});
		$(document).on('click', '.js-close-form-panel-submited', function () {
			resetForm();
			closeFormPanel();
		});

		function openFormPanel () {
			$('body').addClass('form-panel-opened');
			window.mainscroll.disableScroll();
			//$.fn.fullpage.setAllowScrolling(false);
		}
		function closeFormPanel () {
			$('html').removeClass('callback-section-showed');
			$('body').removeClass('form-panel-opened');
			window.setTimeout(function () {
				window.mainscroll.enableScroll();
				//$.fn.fullpage.setAllowScrolling(true);
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
			if($('html').hasClass('callback-section-showed')){
				closeFormPanel();
			} else {
				showFormBox();
			}
			$('.js-submit-form').removeClass('disabled');
			$('.check-agree').prop('checked', true);
		}
		function agreeNo(){
			if($('html').hasClass('callback-section-showed')){
				closeFormPanel();
			} else {
				showFormBox();
			}
			$('.js-submit-form').addClass('disabled');
			$('.check-agree').prop('checked', false);
		}


		$('.form').on('click', '.js-agree-text', function () {

			if($(this).closest('.section-form').length > 0){
				$('html').addClass('callback-section-showed');
			}

			showAgreeBox();
			openFormPanel();
			return false;
		});


		$('.check-agree').change(function() {
			var form = $(this).closest('.form');
			if($(this).is(":checked")) {
				form.find('.js-submit-form').removeClass('disabled');
				$('.check-agree').prop('checked', true);
				setSwitcher(true);
			} else {
				form.find('.js-submit-form').addClass('disabled');
				$('.check-agree').prop('checked', false);
				setSwitcher(false);
			}
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


		function callbackSwitcher () {
			var checked = $('.js-switcher-agree').hasClass('checked');
			if(checked){
				$('.check-agree').prop('checked', false);
				agreeNo();
			} else {
				$('.check-agree').prop('checked', true);
				agreeYes();
			}
		}
		$('.js-switcher-agree').on('click', '.js-switch', function () {
			if(!$(this).hasClass('active')){
				$('.js-switcher-agree').toggleClass('checked');
			}
			$('.js-switcher-agree .js-switch').removeClass('active');
			$(this).addClass('active');
			callbackSwitcher();
		});
		$('.js-switcher-agree').on('click', '.js-switch-icon', function () {
			$('.js-switcher-agree').toggleClass('checked');
			$('.js-switcher-agree .js-switch').toggleClass('active');
			callbackSwitcher();
		});

		function setSwitcher(state){
			if(state){
				$('.js-switcher-agree').removeClass('checked');
				$('.js-switcher-agree .js-switch').removeClass('active');
				$('.js-switcher-agree .js-switch:first').addClass('active');
			} else {
				$('.js-switcher-agree').addClass('checked');
				$('.js-switcher-agree .js-switch').removeClass('active');
				$('.js-switcher-agree .js-switch:last').addClass('active');
			}

		}

		function resetForm () {
			$('.form input[type="text"], .form textarea').each(function () {
				$(this).val('');
			});
			$('.form .placeholder').removeClass('focused');

			/*
			 $('.js-submit-form').addClass('disabled');
			$('.form input[type="checkbox"]').each(function(){
				$(this).prop('checked', false);
			});
			 setSwitcher(false);
			 */


		}

		this.callback = function () {
			showThankBox();
			openFormPanel();
		}
	}
	var mainform = new Form ();

});

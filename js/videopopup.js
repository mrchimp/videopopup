
(function ($) {
	$.fn.videopopup = function (action) {

		var settings,
			spopup_is_showing;

		switch (action) {
			case 'show':
				break;
			case 'hide':
				break;
			default:
				settings = $.extend({
					autoplay: true,
					title: false,
					byline: false,
					portait: false,
					color: '#00adef'
				}, action);

				this.each(function () {
					console.log('each');
					$(this)
						.data('type', ($(this).data('youtube') ? 'youtube' : 'vimeo'))
						.on('click', function (e) {
							e.preventDefault();
							show_popup($(this));
						});
				});
		}
		
		function makeURL(link) {
			if (link.data('type') === 'youtube') {
				return 'BLAH';
			} else {
				return 'http://player.vimeo.com/video/' + link.data('vimeo') + '?autoplay=' + (settings.autoplay ? '1' : '0') + '&amp;title=' + (settings.title ? '1' : '0') + '&amp;byline=' + (settings.byline ? '1' : '0') + '&amp;portrait=' + (settings.portrait ? '1' : '0') + '&amp;color=' + settings.color;
			}
		}

		function show_popup(link) {
console.log('showing popup');

console.log(makeURL(link));
			var iframe = $('<iframe />')
				.attr({
					frameborder: 0,
					src: makeURL(link),
					webkitallowfullscreen: 'webkitallowfullscreen',
					mozallowfullscreen: 'mozallowfullscreen',
					allowfullscreen: 'allowfullscreen'
				});
			
			$('#popup-content').html('').hide();
			$('#popup-mask').fadeIn(function () {
				$('#popup-content').append(iframe).fadeIn(100);
			});

			popup_is_showing = true;

			$(document).on('keyup', handleKeypress);
		};

		function handleKeypress(e) {
			e.preventDefault();

console.log('handling keypress...');

			if (e.which == 27) { //esc
				hidePopup();
			}
		}

		function  hide_popup(link) {
			if (!popup_is_showing) {
				return false;
			}

			$('#popup-mask').fadeOut(function () {
				popup_is_showing = false;
				$('#popup-content').html();
			});

			$(document).off('keyup', handleKeypress);
		}
	};
}(jQuery));

/**
 * Oh, hey there. Welcome to the code.
 */
(function ($) {
	$.fn.videopopup = function (action) {
		var settings = $.extend({
 				// Vimeo options
				autoplay: true,
				title:    false,
				byline:   false,
				portait:  false,
				color:    '#00adef',

				// Youtube options
				controls: true,
				showinfo: false
			}, (typeof action == 'object' ? action : {}));

		switch (action) {
			case 'show':
				showPopup($(this).first());
				break;
			case 'hide':
				hidePopup();
				break;
			default:
				this.each(function () {
					$(this)
						.data('type', ($(this).data('youtube') ? 'youtube' : 'vimeo'))
						.on('click', function (e) {
							if (e.button === 0) { // Don't hijack middle click!
								e.preventDefault();
								showPopup($(this));
							}
						});
				});
		}
		
		function makeURL(link) {
			if (link.data('type') === 'youtube') {
				return 'https://www.youtube.com/embed/' + link.data('youtube') + '?rel=0&amp;autoplay=' + (settings.autoplay ? '1' : '0') + '&amp;controls=' + (settings.controls ? '1' : '0') +  '&amp;showinfo=' + (settings.showinfo ? '1' : '0');
			} else {
				return 'http://player.vimeo.com/video/' + link.data('vimeo') + '?autoplay=' + (settings.autoplay ? '1' : '0') + '&amp;title=' + (settings.title ? '1' : '0') + '&amp;byline=' + (settings.byline ? '1' : '0') + '&amp;portrait=' + (settings.portrait ? '1' : '0') + '&amp;color=' + settings.color;
			}
		}

		function showPopup(link) {
			var iframe = $('<iframe />')
				.attr({
					frameborder: 0,
					src: makeURL(link),
					webkitallowfullscreen: 'webkitallowfullscreen',
					mozallowfullscreen: 'mozallowfullscreen',
					allowfullscreen: 'allowfullscreen'
				});

			var mask = $('<div />').attr('id', 'popup-mask').appendTo($('body'));
			var inner = $('<div />').attr('id', 'popup-inner').appendTo(mask);
			var closer = $('<a />').addClass('popup-close').html('&times;').attr('href', '#').appendTo(inner).on('click', hidePopup);
			var content = $('<div />').attr('id', 'popup-content').append(iframe).appendTo(inner);

			mask.fadeIn(100);

			$(document).on('keyup', $.proxy(handleKeypress, this));
		}

		function handleKeypress(e) {
			e.preventDefault();

			if (e.which == 27) { // esc
				hidePopup();
			}
		}

		function hidePopup() {
			$('#popup-mask').fadeOut(function () {
				$('#popup-mask').remove();
			});

			$(document).off('keyup', $.proxy(handleKeypress, this));
		}
	};
}(jQuery));

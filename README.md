# Video Popup #

A jQuery plugin for opening Vimeo and Youtube videos in a modal window.

 * Configurable embed settings.
 * Stylable with LESS (or CSS, whatever).


## Setup ##

Include jQuery and the videopopup js and css files in your HTML.

Make some links and add some video codes.

		<a href="#" class="my-video-links" data-vimeo="84215473">Vimeo</a>
		<a href="#" class="my-video-links" data-youtube="ppZzR-z8RqE">Youtube</a>

Do something like the following to make your links work:

    $('.my-video-links').videopopup({
		autoplay: true,
		color: '#f00'
	});


## Options ##

All options are optional. Defaults are shown below. Options affect either Vimeo or Youtube links but you can specify them all together - it won't cause problems.

### Options for Vimeo Links ###

* autoplay (true)
* title (false)
* byline (false)
* portrait (false)
* color (#00adef)

### Options for Youtube links ###

* controls (true)
* showinfo (false)
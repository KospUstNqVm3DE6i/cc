function show_next(event) {
	'use strict';
	var i, index,
		img = event.target,
		current = img.getAttribute('src');
	for (i in screenshots) {
		if (screenshots[i].screenshot === current) {
			index = parseInt(i, 10);
			break;
		}
	}
	index = (index === screenshots.length - 1) ? 0 : index + 1;
	console.log(index);
	img.setAttribute('src', screenshots[index].screenshot);
}

function show_categories(event) {
	'use strict';
	var i, child,
		button = event.target,
		container = button.parentNode.parentNode,
		children = container.children;
	for (i in children) {
		child = children[i];
		if (child.tagName !== undefined && child.getAttribute('class') === 'hidden') {
			child.setAttribute('class', '');
		}
	}
	button.parentNode.setAttribute('class', 'hidden');
}

function update_currency(element) {
	'use strict';
	var is_gift = element.getAttribute('id').lastIndexOf('gift') > -1,
		prefix = (is_gift ? 'gift_' : 'key_'),
		price_container = is_gift ? document.getElementById('gift_price') : document.getElementById('key_price'),
		currency_container = is_gift ? document.getElementById('gift_currency') : document.getElementById('key_currency'),
		current = element.value;
	console.log(prefix + current.toLowerCase());
	price_container.innerHTML = Math.ceil(prices[prefix + current.toLowerCase()] * 100) / 100;
	switch (current) {
	case 'WMR':
		currency_container.innerHTML = 'руб.';
		break;
	case 'WMZ':
		currency_container.innerHTML = '$';
		break;
	case 'WME':
		currency_container.innerHTML = '€';
		break;
	case 'WMU':
		currency_container.innerHTML = 'грн.';
		break;
	case 'PYU':
		currency_container.innerHTML = 'руб.';
		break;
	case 'PY1':
		currency_container.innerHTML = '$';
		break;
	case 'PY2':
		currency_container.innerHTML = '€';
		break;
	case 'MTS':
		currency_container.innerHTML = 'руб.';
		break;
	case 'MGF':
		currency_container.innerHTML = 'руб.';
		break;
	case 'BLN':
		currency_container.innerHTML = 'руб.';
		break;
	case 'TL2':
		currency_container.innerHTML = 'руб.';
		break;
	case 'PCR':
		currency_container.innerHTML = 'руб.';
		break;
	case 'QSP':
		currency_container.innerHTML = 'руб.';
		break;
	}
}

function currency_change(event) {
	'use strict';
	update_currency(event.target);
}

function screenshot_fullscreen(event) {
	'use strict';
	var src = event.target.getAttribute('src');
	console.log(src);
	document.getElementById('modal_screenshot').setAttribute('src', src);
	jQuery("#screen_modal").modal("show");
}

function render_screenshots() {
	'use strict';
	var container = document.getElementById('screenshots_chooser'),
		list = document.getElementById('screenshots_list'),
		is_first = true,
		node, i, href, item, thumb, screen, div;
	for (i in screenshots) {
		item = screenshots[i];
		node = document.createElement('li');
		href = document.createElement('a');
		if (is_first) {
			node.setAttribute('class', 'active');
		}
		href.setAttribute('href', '#screen_' + i);
		href.setAttribute('data-toggle', 'pill');
		thumb = document.createElement('img');
		thumb.setAttribute('src', item.thumb);
		thumb.setAttribute('width', 116);
		thumb.setAttribute('height', 65);
		href.appendChild(thumb);
		node.appendChild(href);
		container.appendChild(node);
		div = document.createElement('div');
		if (is_first) {
			div.setAttribute('class', 'tab-pane  col-sm-12 fade active in');
		} else {
			div.setAttribute('class', 'tab-pane  col-sm-12 fade');
		}
		div.setAttribute('id', 'screen_' + i);
		href = document.createElement('a');
		href.onclick = function() { return false; };
		href.setAttribute('href', '#');
		screen = document.createElement('img');
		screen.setAttribute('src', item.screenshot);
		screen.setAttribute('class', 'no-margin thumbnail screenshot');
		screen.onclick = screenshot_fullscreen;
		href.appendChild(screen);
		div.appendChild(href);
		list.appendChild(div);
		is_first = false;
	}
}

function render_video(id) {
	'use strict';
	console.log(id);
	var container = document.getElementById('video_container');
	container.setAttribute('src', videos[id].video);
}

function render_videos() {
	'use strict';
	var container = document.getElementById('videos_chooser'),
		source,
		is_first = true,
		node, i, href, item, thumb;
	for (i in videos) {
		item = videos[i];
		node = document.createElement('li');
		href = document.createElement('a');
		if (is_first) {
			node.setAttribute('class', 'active');
		}
		href.setAttribute('href', '#video_' + i);
		href.setAttribute('data-toggle', 'pill');
		thumb = document.createElement('img');
		thumb.setAttribute('src', item.thumb);
		thumb.setAttribute('width', 116);
		thumb.setAttribute('height', 65);
		href.appendChild(thumb);
		href.onclick = function(id) {
			return function() {
				render_video(id);
			}
		}(i);
		node.appendChild(href);
		container.appendChild(node);
		if (is_first) {
			render_video(i);
		}
		is_first = false;
	}
}

function on_window_load() {
	'use strict';
	render_screenshots();
	render_videos();
	if (document.getElementById('gift_change_currency')) {
		update_currency(document.getElementById('gift_change_currency'));
	}
	if (document.getElementById('key_change_currency')) {
		update_currency(document.getElementById('key_change_currency'));
	}
}

if (window.attachEvent) {
    window.attachEvent('onload', on_window_load);
} else {
    if (window.onload) {
        var curronload = window.onload;
        var newonload = function() {
			'use strict';
            curronload();
            on_window_load();
        };
        window.onload = newonload;
    } else {
        window.onload = on_window_load;
    }
}
jQuery(document).ready(function(){
    jQuery('#sreenshots_collapse').on(
		'shown.bs.collapse',
		function () {
			jQuery("#screenshots_toggle").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
		}
	);
    jQuery('#sreenshots_collapse').on(
		'hidden.bs.collapse',
		function () {
			jQuery("#screenshots_toggle").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
		}
	);
});
jQuery(document).ready(function(){
    jQuery('#videos_collapse').on(
		'shown.bs.collapse',
		function () {
			jQuery("#videos_toggle").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
		}
	);
    jQuery('#videos_collapse').on(
		'hidden.bs.collapse',
		function () {
			jQuery("#videos_toggle").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
		}
	);
});
jQuery(document).ready(function(){
    jQuery('#sub_collapse').on(
		'shown.bs.collapse',
		function () {
			jQuery("#sub_toggle").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
		}
	);
    jQuery('#sub_collapse').on(
		'hidden.bs.collapse',
		function () {
			jQuery("#sub_toggle").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
		}
	);
});

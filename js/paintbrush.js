var Paintbrush = function($canvas) {
	var scope = this;

	scope.width = 1334;
	scope.height = 750;
	scope.images = [];
	$canvas[0].ondragstart = $canvas[0].onselectstart = function(e) {
		if (e && e.preventDefault) {
			e.preventDefault();
		}
		if (e && e.stopPropagation) {
			e.stopPropagation();
		}
		return false;
	}
	scope.ctx = $canvas[0].getContext('2d');

	scope.loadFinish = function() {
		scope.drawBackground();
	}

	scope.putImage = function(image_name, xpos, ypos, xsize, ysize, is_center) {
		if (is_center) {
			xpos -= xsize / 2;
			ypos -= ysize / 2;
		}
		var image_object = scope.images[image_name];
		scope.ctx.drawImage(image_object, xpos, ypos, xsize, ysize);
	}

	scope.drawBackground = function() {
		scope.putImage('background', 0, 0, scope.width, scope.height, false);
	}
}

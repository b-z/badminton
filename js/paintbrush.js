var Paintbrush = function($canvas, info) {
	var scope = this;

	for (var i in info) {
		scope[i] = info[i];
	}

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
		scope.drawBackground(true);
		scope.drawDebug();
	}

	scope.putImage = function(image_name, xpos, ypos, xsize, ysize, is_center) {
		if (is_center) {
			xpos -= xsize / 2;
			ypos -= ysize / 2;
		}
		var image_object = scope.images[image_name];
		scope.ctx.drawImage(image_object, xpos, ypos, xsize, ysize);
	}

	scope.drawBackground = function(white) {
		if (white) {
			scope.ctx.save();
			scope.ctx.fillStyle = 'white';
			scope.ctx.fillRect(0, 0, scope.width, scope.height);
			scope.ctx.restore();
		} else {
			scope.putImage('background', 0, 0, scope.width, scope.height, false);
		}
	}

	scope.drawDebug = function() {
		scope.ctx.save();
		scope.ctx.strokeStyle = '#88f';
		scope.ctx.beginPath();
		// 球场上部边界
		scope.ctx.moveTo(scope.ground_edge, scope.height - scope.ground_edge);
		scope.ctx.lineTo(scope.width - scope.ground_edge, scope.height - scope.ground_edge);

		// 球场左右边界
		scope.ctx.moveTo(scope.ground_edge, scope.height - scope.ground_edge);
		scope.ctx.lineTo(0, scope.height);
		scope.ctx.moveTo(scope.width - scope.ground_edge, scope.height - scope.ground_edge);
		scope.ctx.lineTo(scope.width, scope.height);

		// 左右墙
		scope.ctx.moveTo(scope.ground_edge, scope.height - scope.ground_edge);
		scope.ctx.lineTo(scope.ground_edge, 0);
		scope.ctx.moveTo(scope.width - scope.ground_edge, scope.height - scope.ground_edge);
		scope.ctx.lineTo(scope.width - scope.ground_edge, 0);

		// 中线
		scope.ctx.moveTo(scope.width / 2, 0);
		scope.ctx.lineTo(scope.width / 2, scope.height - scope.net_height-20);


		scope.ctx.closePath();
		scope.ctx.stroke();

		scope.ctx.strokeStyle = '#f88';
		scope.ctx.beginPath();
		// 地面
		scope.ctx.moveTo(scope.ground_edge / 2, scope.height - scope.ground_edge / 2);
		scope.ctx.lineTo(scope.width - scope.ground_edge / 2, scope.height - scope.ground_edge / 2);

		// 网
		scope.ctx.moveTo(scope.width / 2, scope.height - scope.net_height);
		scope.ctx.lineTo(scope.width / 2, scope.height - scope.ground_edge / 2);

		// 左右墙中线
		scope.ctx.moveTo(scope.ground_edge / 2, scope.height - scope.ground_edge / 2);
		scope.ctx.lineTo(scope.ground_edge / 2, 0);
		scope.ctx.moveTo(scope.width - scope.ground_edge / 2, scope.height - scope.ground_edge / 2);
		scope.ctx.lineTo(scope.width - scope.ground_edge / 2, 0);

		// 球网
		scope.ctx.moveTo(scope.width / 2, scope.height - scope.net_height);
		scope.ctx.lineTo(scope.width / 2 + 20, scope.height - scope.net_height + 20);
		scope.ctx.moveTo(scope.width / 2 - 20, scope.height - scope.net_height + 20);
		scope.ctx.lineTo(scope.width / 2, scope.height - scope.net_height);

		// 发球线
		scope.ctx.moveTo(scope.service_line-scope.service_line_offset,scope.height);
		scope.ctx.lineTo(scope.service_line+scope.service_line_offset,scope.height-scope.ground_edge);
		scope.ctx.moveTo(scope.width-scope.service_line+scope.service_line_offset,scope.height);
		scope.ctx.lineTo(scope.width-scope.service_line-scope.service_line_offset,scope.height-scope.ground_edge);

		scope.ctx.closePath();
		scope.ctx.stroke();
		scope.ctx.restore();
	}
}

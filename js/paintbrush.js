var Paintbrush = function($canvas, info) {
	var scope = this;

	scope.debug = true;
	scope.objects = [];
	scope.info = info;
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

	// scope.loadFinish = function() {
	// 	scope.drawBackground();
	// 	if (scope.debug) {
	// 		scope.drawDebug();
	// 	}
	// }

	scope.setObjects = function(objects) {
		scope.objects = objects;
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
		if (scope.debug) {
			scope.ctx.save();
			scope.ctx.fillStyle = 'white';
			scope.ctx.fillRect(0, 0, scope.info.width, scope.info.height);
			scope.ctx.restore();
		} else {
			scope.putImage('background', 0, 0, scope.info.width, scope.info.height, false);
		}
	}

	scope.drawPlayer = function(player) {
		player.updateCanvasCoordinate();
		var x = player.position_c.x;
		var y = player.position_c.y;
		var h = player.human_height;
		if (scope.debug) {
			scope.ctx.save();
			scope.ctx.strokeStyle = '#808';
			scope.ctx.lineWidth = 6;
			scope.ctx.beginPath();
			// scope.ctx.translate(x, y);
			// scope.ctx.rotate(-r);
			// scope.ctx.translate(-x, -y);

			// scope.ctx.moveTo(x - 20, y - 20);
			// scope.ctx.lineTo(x + 20, y + 20);
			// scope.ctx.moveTo(x - 20, y + 20);
			// scope.ctx.lineTo(x + 20, y - 20);
			scope.ctx.moveTo(x, y);
			scope.ctx.lineTo(x, y + h);
			scope.ctx.closePath();
			scope.ctx.stroke();
			scope.ctx.restore();
		}
	}

	scope.drawBall = function(ball) {
		ball.updateCanvasCoordinate();
		var x = ball.position_c.x;
		var y = ball.position_c.y;
		var r = ball.rotation;
		if (scope.debug) {
			scope.ctx.save();
			scope.ctx.strokeStyle = '#8f8';
			scope.ctx.lineWidth = 6;
			scope.ctx.beginPath();
			scope.ctx.translate(x, y);
			scope.ctx.rotate(-r);
			scope.ctx.translate(-x, -y);
			scope.ctx.moveTo(x - 20, y - 20);
			scope.ctx.lineTo(x + 20, y + 20);
			scope.ctx.moveTo(x - 20, y + 20);
			scope.ctx.lineTo(x + 20, y - 20);
			scope.ctx.moveTo(x, y);
			scope.ctx.lineTo(x, y + 60);
			scope.ctx.closePath();
			scope.ctx.stroke();
			scope.ctx.restore();
		}
	}

	scope.drawDebug = function() {
		scope.ctx.save();
		scope.ctx.strokeStyle = '#88f';
		scope.ctx.beginPath();
		// 球场上部边界
		scope.ctx.moveTo(scope.info.ground_edge, scope.info.height - scope.info.ground_edge);
		scope.ctx.lineTo(scope.info.width - scope.info.ground_edge, scope.info.height - scope.info.ground_edge);

		// 球场左右边界
		scope.ctx.moveTo(scope.info.ground_edge, scope.info.height - scope.info.ground_edge);
		scope.ctx.lineTo(0, scope.info.height);
		scope.ctx.moveTo(scope.info.width - scope.info.ground_edge, scope.info.height - scope.info.ground_edge);
		scope.ctx.lineTo(scope.info.width, scope.info.height);

		// 左右墙
		scope.ctx.moveTo(scope.info.ground_edge, scope.info.height - scope.info.ground_edge);
		scope.ctx.lineTo(scope.info.ground_edge, 0);
		scope.ctx.moveTo(scope.info.width - scope.info.ground_edge, scope.info.height - scope.info.ground_edge);
		scope.ctx.lineTo(scope.info.width - scope.info.ground_edge, 0);

		// 中线
		scope.ctx.moveTo(scope.info.width / 2, 0);
		scope.ctx.lineTo(scope.info.width / 2, scope.info.height - scope.info.net_height - 20);


		scope.ctx.closePath();
		scope.ctx.stroke();

		scope.ctx.strokeStyle = '#f88';
		scope.ctx.beginPath();
		// 地面
		scope.ctx.moveTo(scope.info.ground_edge / 2, scope.info.height - scope.info.ground_edge / 2);
		scope.ctx.lineTo(scope.info.width - scope.info.ground_edge / 2, scope.info.height - scope.info.ground_edge / 2);

		// 网
		scope.ctx.moveTo(scope.info.width / 2, scope.info.height - scope.info.net_height);
		scope.ctx.lineTo(scope.info.width / 2, scope.info.height - scope.info.ground_edge / 2);

		// 左右墙中线
		scope.ctx.moveTo(scope.info.ground_edge / 2, scope.info.height - scope.info.ground_edge / 2);
		scope.ctx.lineTo(scope.info.ground_edge / 2, 0);
		scope.ctx.moveTo(scope.info.width - scope.info.ground_edge / 2, scope.info.height - scope.info.ground_edge / 2);
		scope.ctx.lineTo(scope.info.width - scope.info.ground_edge / 2, 0);

		// 球网
		scope.ctx.moveTo(scope.info.width / 2, scope.info.height - scope.info.net_height);
		scope.ctx.lineTo(scope.info.width / 2 + 20, scope.info.height - scope.info.net_height + 20);
		scope.ctx.moveTo(scope.info.width / 2 - 20, scope.info.height - scope.info.net_height + 20);
		scope.ctx.lineTo(scope.info.width / 2, scope.info.height - scope.info.net_height);

		// 发球线
		scope.ctx.moveTo(scope.info.service_line - scope.info.service_line_offset, scope.info.height);
		scope.ctx.lineTo(scope.info.service_line + scope.info.service_line_offset, scope.info.height - scope.info.ground_edge);
		scope.ctx.moveTo(scope.info.width - scope.info.service_line + scope.info.service_line_offset, scope.info.height);
		scope.ctx.lineTo(scope.info.width - scope.info.service_line - scope.info.service_line_offset, scope.info.height - scope.info.ground_edge);

		scope.ctx.closePath();
		scope.ctx.stroke();

		scope.ctx.restore();
	}
}

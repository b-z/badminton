var Paintbrush = function($canvas, info) {
	var scope = this;

	scope.debug = true;
	scope.objects = {};
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

	scope.setObjects = function(id, obj) {
		scope.objects[id] = obj;
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
		var lfp = scope.info.toCanvasCoord(scope.info.left_front_point);
		var lbp = scope.info.toCanvasCoord(scope.info.left_back_point);


		// player.updateCanvasCoordinate();
		// var x = player.position_c.x;
		// var y = player.position_c.y;
		var p = scope.info.toCanvasCoord(player.position);
		var p_head = scope.info.toCanvasCoord(player.position_head);
		var x = p[0];
		var y = p[1];
		var y_head = p_head[1];
		// console.log(player.position,x,y);
		var h = player.human_height;
		if (scope.debug) {
			scope.ctx.save();
			scope.ctx.translate(0, -(lbp[1] + lfp[1]) / 2 + 1000);
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
			scope.ctx.lineTo(x, y_head);
			scope.ctx.closePath();
			scope.ctx.stroke();
			if (player.hit_status.is_hitting) {
				scope.ctx.strokeStyle = '#880';
				var angle = (player.hit_range[0] + (player.hit_range[1] - player.hit_range[0]) * (player.hit_time - player.hit_status.timer) / player.hit_time) / 180 * Math.PI;
				// TODO: 使用函数计算
				scope.ctx.beginPath();	
				scope.ctx.moveTo(x, y_head);
				var x_ = x + 500 * Math.cos(angle);
				var y_ = y_head - 500 * Math.sin(angle);
				scope.ctx.lineTo(x_, y_);
				scope.ctx.closePath();
				scope.ctx.stroke();
			}
			scope.ctx.restore();
		}
	}

	scope.drawBall = function(ball) {
		var lfp = scope.info.toCanvasCoord(scope.info.left_front_point);
		var lbp = scope.info.toCanvasCoord(scope.info.left_back_point);

		// ball.updateCanvasCoordinate();
		var p = scope.info.toCanvasCoord(ball.position);
		var x = p[0];
		var y = p[1];
		// console.log(ball.position,p,x,y);
		var r = ball.rotation;
		if (scope.debug) {
			scope.ctx.save();
			scope.ctx.translate(0, -(lbp[1] + lfp[1]) / 2 + 1000);
			scope.ctx.strokeStyle = '#8f8';
			scope.ctx.lineWidth = 6;
			scope.ctx.beginPath();
			scope.ctx.translate(x, y);
			scope.ctx.rotate(-r);
			scope.ctx.translate(-x, -y);
			scope.ctx.moveTo(x + 20, y+ 20);
			scope.ctx.lineTo(x , y );
			scope.ctx.moveTo(x , y );
			scope.ctx.lineTo(x - 20, y + 20);
			scope.ctx.moveTo(x, y);
			scope.ctx.lineTo(x, y + 60);
			scope.ctx.closePath();
			scope.ctx.stroke();
			scope.ctx.restore();
		}
	}

	scope.drawDebug = function() {
		var lfp = scope.info.toCanvasCoord(scope.info.left_front_point);
		var lbp = scope.info.toCanvasCoord(scope.info.left_back_point);
		var rfp = scope.info.toCanvasCoord(scope.info.right_front_point);
		var rbp = scope.info.toCanvasCoord(scope.info.right_back_point);
		var fn = scope.info.toCanvasCoord(scope.info.front_net);
		var bn = scope.info.toCanvasCoord(scope.info.back_net);
		var lfs = scope.info.toCanvasCoord(scope.info.left_front_service);
		var lbs = scope.info.toCanvasCoord(scope.info.left_back_service);
		var rfs = scope.info.toCanvasCoord(scope.info.right_front_service);
		var rbs = scope.info.toCanvasCoord(scope.info.right_back_service);

		scope.ctx.save();

		scope.ctx.translate(0, -(lbp[1] + lfp[1]) / 2 + 1000);

		scope.ctx.strokeStyle = '#88f';
		scope.ctx.beginPath();

		scope.ctx.moveTo(lfp[0], lfp[1]);
		scope.ctx.lineTo(lbp[0], lbp[1]);
		scope.ctx.lineTo(rbp[0], rbp[1]);
		scope.ctx.lineTo(rfp[0], rfp[1]);
		scope.ctx.lineTo(lfp[0], lfp[1]);


		scope.ctx.moveTo((lbp[0] + rbp[0]) / 2, (lbp[1] + rbp[1]) / 2);
		scope.ctx.lineTo((lfp[0] + rfp[0]) / 2, (lfp[1] + rfp[1]) / 2);

		scope.ctx.moveTo(lbp[0],lbp[1]);
		scope.ctx.lineTo(lbp[0],lbp[1]-1080);
		scope.ctx.moveTo(rbp[0],rbp[1]);
		scope.ctx.lineTo(rbp[0],rbp[1]-1080);
		scope.ctx.moveTo(lfp[0],lfp[1]);
		scope.ctx.lineTo(lfp[0],lfp[1]-1080);
		scope.ctx.moveTo(rfp[0],rfp[1]);
		scope.ctx.lineTo(rfp[0],rfp[1]-1080);


		scope.ctx.closePath();
		scope.ctx.stroke();

		scope.ctx.strokeStyle = '#f88';
		scope.ctx.beginPath();

		// 网
		scope.ctx.moveTo((lfp[0] + rfp[0]) / 2, (lfp[1] + rfp[1]) / 2);
		scope.ctx.lineTo(fn[0], fn[1]);
		scope.ctx.lineTo(bn[0], bn[1]);
		scope.ctx.lineTo((lbp[0] + rbp[0]) / 2, (lbp[1] + rbp[1]) / 2);

		// 中线
		scope.ctx.moveTo((lbp[0] + lfp[0]) / 2, (lbp[1] + lfp[1]) / 2);
		scope.ctx.lineTo((rbp[0] + rfp[0]) / 2, (rbp[1] + rfp[1]) / 2);
		// console.log((lbp[1] + lfp[1]) / 2);

		scope.ctx.moveTo((lbp[0] + lfp[0]) / 2, (lbp[1] + lfp[1]) / 2);
		scope.ctx.lineTo((lbp[0] + lfp[0]) / 2, (lbp[1] + lfp[1]) / 2-1080);
		scope.ctx.moveTo((rbp[0] + rfp[0]) / 2, (rbp[1] + rfp[1]) / 2);
		scope.ctx.lineTo((rbp[0] + rfp[0]) / 2, (rbp[1] + rfp[1]) / 2-1080);

		scope.ctx.moveTo(lbs[0], lbs[1]);
		scope.ctx.lineTo(lfs[0], lfs[1]);
		scope.ctx.moveTo(rbs[0], rbs[1]);
		scope.ctx.lineTo(rfs[0], rfs[1]);

		scope.ctx.closePath();
		scope.ctx.stroke();

		scope.ctx.restore();
	}

	scope.drawDebug2 = function() {
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

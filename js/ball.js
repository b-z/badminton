var Ball = function(pos, rot) {
	// 默认是朝上的，逆时针为正
	// 位置对于球的原点为判定点(头部)，对于场景的原点为地面、场地中线，左负右正，下负上正
	var scope = this;

	scope.is_serving = true;

	scope.position = pos;
	scope.last_position = pos.copy();
	scope.last_position_valid = false;

	scope.rotation = rot;

	scope.speed = new Vector(0, 0);

	scope.gamma = 1.9;
	scope.beta = 0.5;

	scope.stop = true;

	// scope.position_c = new Vector(0, 0);

	// scope.updateCanvasCoordinate = function() {
	// 	// 绘制之前调用此函数
	// 	scope.position_c.x = scope.position.x + info.width / 2;
	// 	scope.position_c.y = info.height - info.ground_edge / 2 - scope.position.y;
	// }
	//
	// scope.updateCanvasCoordinate();

	scope.current_hit = {
		start: scope.position,
		speed: scope.speed,
		time: 0
	}

	scope.stepOver = function() {
		if (scope.stop || scope.is_serving) return;
		scope.last_position = scope.position.copy();

		var start = scope.current_hit.start;
		var speed = scope.current_hit.speed;
		var time = (CLOCK - scope.current_hit.time) / info.fps;

		var result = scope.move(start, speed, time);
		scope.position.x = result[0];
		scope.position.y = result[1];
		scope.speed.x = result[2];
		scope.speed.y = result[3];
		scope.rotation = Math.atan2(-scope.speed.x, scope.speed.y);

		if (scope.last_position_valid) {
			if (scope.position.x * scope.last_position.x <= 0) {
				if (scope.position.y <= info.real_net) {
					scope.position.x = 0;
					scope.stop = true;
					return;
				}
			}
		}
		scope.last_position_valid = true;

		if (scope.position.y < 0) {
			scope.position.y = 0;
			// Materialize.toast('goal', 1000);
			scope.stop = true;
			return;
		}
	}

	scope.move = function(start, speed, time) {
		var xx = start.x;
		var xy = start.y;
		var vx = speed.x;
		var vy = speed.y;
		var c1x = vx / scope.gamma + xx - info.g.x / (scope.gamma * scope.gamma);
		var c1y = vy / scope.gamma + xy - info.g.y / (scope.gamma * scope.gamma);
		var c2x = xx - c1x;
		var c2y = xy - c1y;
		var xt = c1x + c2x * Math.exp(-scope.gamma * time) + info.g.x / scope.gamma * time;
		var yt = c1y + c2y * Math.exp(-scope.gamma * time) + info.g.y / scope.gamma * time;
		var vxt = -scope.gamma * c2x * Math.exp(-scope.gamma * time) + info.g.x / scope.gamma;
		var vyt = -scope.gamma * c2y * Math.exp(-scope.gamma * time) + info.g.y / scope.gamma;
		if (xt > info.real_width / 2) {
			vxt = -vxt;
			xt = info.real_width - xt;
		}
		if (xt < -info.real_width / 2) {
			vxt = -vxt;
			xt = -info.real_width - xt;
		}
		return [xt, yt, vxt, vyt];
	}

	scope.hit = function(start, speed, current_time) {
		scope.current_hit.start = start;
		scope.current_hit.speed = speed;
		scope.current_hit.time = current_time;
		scope.last_position_valid = false;
		scope.stop = false;
		scope.is_serving = false;
	}


	// scope.checkHitGround = function() {
	// 	if (scope.position.y>=0) {
	// 		return false;
	// 	}
	// 	if (scope.speed.y>-1) {
	// 		return true;
	// 	}
	// 	scope.position.y = -scope.position.y;
	// 	scope.speed.y = -scope.beta * scope.speed.y;
	// 	return false;
	// }

	scope.hitDebug = function(start, speed, time, brush_object) {
		var pos = scope.move(start, speed, time);

		scope.position.x = pos[0];
		scope.position.y = pos[1];
		scope.speed.x = pos[2];
		scope.speed.y = pos[3];
		scope.rotation = Math.atan2(-scope.speed.x, scope.speed.y);
		// console.log(pos, time);

		// if (scope.checkHitGround()) {
		if (scope.position.y < 0) {
			Materialize.toast('goal', 1000);
			return;
		}
		// console.log(scope.position);
		if ($('#paint_bg')[0].checked) {
			brush_object.drawBackground();
		}
		if (brush_object.debug) {
			brush_object.drawDebug();
		}

		brush_object.drawBall(scope);

		// console.log(time);
		// start.x = pos[0];
		// start.y = pos[1];
		// speed.x = pos[2];
		// speed.y = pos[3];



		setTimeout(function() {
			scope.hitDebug(start, speed, time + 1 / info.fps, brush_object);
		}, 1000 / info.fps);
	}
}

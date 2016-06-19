var Ball = function(info, pos, rot) {
	// 默认是朝上的，逆时针为正
	// 位置对于球的原点为判定点(头部)，对于场景的原点为地面、场地中线，左负右正，下负上正
	var scope = this;

	scope.info = info;
	scope.position = pos;
	scope.rotation = rot;

	scope.speed = new Vector(0, 0);

	// scope.position_c = new Vector(0, 0);

	// scope.updateCanvasCoordinate = function() {
	// 	// 绘制之前调用此函数
	// 	scope.position_c.x = scope.position.x + scope.info.width / 2;
	// 	scope.position_c.y = scope.info.height - scope.info.ground_edge / 2 - scope.position.y;
	// }
	//
	// scope.updateCanvasCoordinate();

	scope.g = new Vector(0, -980);
	scope.gamma = 2;
	scope.beta = 0.5;

	scope.move = function(start, speed, time) {
		var xx = start.x;
		var xy = start.y;
		var vx = speed.x;
		var vy = speed.y;
		var c1x = vx / scope.gamma + xx - scope.g.x / (scope.gamma * scope.gamma);
		var c1y = vy / scope.gamma + xy - scope.g.y / (scope.gamma * scope.gamma);
		var c2x = xx - c1x;
		var c2y = xy - c1y;
		var xt = c1x + c2x * Math.exp(-scope.gamma * time) + scope.g.x / scope.gamma * time;
		var yt = c1y + c2y * Math.exp(-scope.gamma * time) + scope.g.y / scope.gamma * time;
		var vxt = -scope.gamma * c2x * Math.exp(-scope.gamma * time) + scope.g.x / scope.gamma;
		var vyt = -scope.gamma * c2y * Math.exp(-scope.gamma * time) + scope.g.y / scope.gamma;
		if (xt > scope.info.real_width / 2) {
			vxt = -vxt;
			xt = scope.info.real_width - xt;
		}
		if (xt < -scope.info.real_width / 2) {
			vxt = -vxt;
			xt = -scope.info.real_width - xt;
		}
		return [xt, yt, vxt, vyt];
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
			scope.hitDebug(start, speed, time + 1 / scope.info.fps, brush_object);
		}, 1000 / scope.info.fps);
	}
}

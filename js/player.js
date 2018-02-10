var Player = function(pos, human_height, id, isAI, x_speed, y_speed) {
	// 坐标是以脚部为基准的，另有记录身高等信息
	// 身高是胳膊的旋转轴
	var scope = this;

	scope.id = id;
	scope.sid = scope.id == '1' ? 1 : -1;

	scope.isAI = isAI;
	scope.human_height = human_height;// / 155 * (info.net_height - info.ground_edge / 2);

	scope.position = pos;
	scope.position_head = new Vector3(pos.x, pos.y+scope.human_height, pos.z);
	scope.last_position_head = new Vector3(scope.position_head.x, scope.position_head.y, pos.z);

	scope.x_speed = x_speed; // 这个人水平运动能够达到的速度
	scope.y_speed = y_speed; // 这个人起跳的速度
	scope.x_acceleration = 3000; // 水平方向改变速度的加速度

	scope.speed = new Vector(0, 0); // 这个人现在的速度

	// scope.position_c = new Vector3(0, 0);

	// scope.updateCanvasCoordinate = function() {
	// 	// 绘制之前调用此函数
	// 	scope.position_c.x = scope.position.x + info.width / 2;
	// 	scope.position_c.y = info.height - info.ground_edge / 2 - scope.position.y - scope.human_height;
	// }
	//
	// scope.updateCanvasCoordinate();
	scope.kup = false;
	scope.kdown = false;
	scope.kleft = false;
	scope.kright = false;

	// scope.is_moving = false;
	scope.is_on_floor = true;

	scope.hit_time = 0.3; // 挥拍动作持续时间
	scope.hit_range = scope.id == '1' ? [135, -20] : [45, 200]; // 挥拍角度范围(角度制)
	scope.arm_range = [80, 250];
	scope.hit_status = {
		is_hitting: false,
		cannot_hit: false,
		direction: 0, // 0: normal 1: bottom to top
		timer: 0 // 倒计时
	};

	scope.checkHit = function(ball) {
		if (scope.hit_status.cannot_hit) return;
		// 判断标准: 球在上一帧到当前帧之间的扇形里
		var bx2 = ball.position.x;
		var by2 = ball.position.y;
		var bx1 = ball.last_position.x;
		var by1 = ball.last_position.y;
		// console.log(Math.round(bx), Math.round(bx2), Math.round(by), Math.round(by2));
		var mx2 = scope.position_head.x;
		var my2 = scope.position_head.y;
		var mx1 = scope.last_position_head.x;
		var my1 = scope.last_position_head.y;

		var angle1 = scope.hit_range[0] + 
			(scope.hit_range[1] - scope.hit_range[0]) * 
			(scope.hit_time - scope.hit_status.timer - 1 / info.fps) / scope.hit_time;
		var angle2 = scope.hit_range[0] + 
			(scope.hit_range[1] - scope.hit_range[0]) * 
			(scope.hit_time - scope.hit_status.timer) / scope.hit_time;

		var distance2 = Math.pow(scope.position_head.x - ball.position.x, 2) + 
			Math.pow(scope.position_head.y - ball.position.y, 2);
		if (distance2 < Math.pow(scope.arm_range[0], 2) || distance2 > Math.pow(scope.arm_range[1], 2)) 
			return;

		var ball_angle1 = Math.atan2(by1 - my1, bx1 - mx1) * 180 / Math.PI;
		var ball_angle2 = Math.atan2(by2 - my2, bx2 - mx2) * 180 / Math.PI;
		// if (by < my) ball_angle1 = -180 - ball_angle1;
		// if (by2 < my) ball_angle2 = -180 - ball_angle2;
		// console.log(Math.round(ball_angle1), Math.round(ball_angle2), Math.round(angle1), Math.round(angle2));
		if (((ball_angle1 >= angle1 && ball_angle2 <= angle2) ||
			(ball_angle1 <= angle1 && ball_angle2 >= angle2)) &&
			Math.abs(ball_angle1 - ball_angle2) < 270 && 
			angle2 >=0 && angle2 <= 180) {
			// clearInterval(TIMER);
			// console.log(ball_angle1, ball_angle2, angle1, angle2);
			
			// var vx = (1000 + Math.random() * 2000)*(scope.sid);
			// var vy = 500 + Math.random() * 1000;
			var speed = 1000 + Math.random() * 1000;
			scope.hitBall(ball, angle2, speed);
		}
	}

	scope.hitBall = function(ball, angle, speed) {
		if (scope.id == '1') {
			angle -= 90;
		} else {
			angle += 90;
		}
		var a = speed * Math.cos(angle / 180 * Math.PI);
		var b = speed * Math.sin(angle / 180 * Math.PI);
		a += speed * 0.6 * scope.sid;
		ball.hit(ball.position.copy(), new Vector(a, b), CLOCK);
		scope.hit_status.cannot_hit = true;
	}

	scope.stepOver = function() {
		// 水平运动
		if (scope.kleft && !scope.kright) {
	        scope.speed.x -= scope.x_acceleration / info.fps;
	    } else if (scope.kright && !scope.kleft) {
	        scope.speed.x += scope.x_acceleration / info.fps;
	    } else {
	    	if (scope.speed.x > 0) {
		        scope.speed.x -= scope.x_acceleration / info.fps;
		        if (scope.speed.x < 0) scope.speed.x = 0;
	    	} else if (scope.speed.x < 0) {
		        scope.speed.x += scope.x_acceleration / info.fps;
		        if (scope.speed.x > 0) scope.speed.x = 0;
	    	}
	    }

		if (scope.speed.x < -scope.x_speed) scope.speed.x = -scope.x_speed;
        if (scope.speed.x > scope.x_speed) scope.speed.x = scope.x_speed;

	    scope.position.x += scope.speed.x / info.fps;
	    if (id == '1') {
	    	if (scope.position.x > -10) scope.position.x = -10;
	    	if (scope.position.x < -info.real_width / 2 + 10) scope.position.x = -info.real_width / 2 + 10;
	    } else {
	    	if (scope.position.x < 10) scope.position.x = 10;
	    	if (scope.position.x > info.real_width / 2 - 10) scope.position.x = info.real_width / 2 - 10;
	    }


        // 垂直运动
	    if (scope.kup && scope.is_on_floor) {
			// console.log(CLOCK);
	        scope.kup = false;
	        scope.speed.y = y_speed;
	        scope.is_on_floor = false;
	    }
	    if (!scope.is_on_floor) {
	    	scope.speed.y += info.g.y / info.fps;
	    	scope.position.y += scope.speed.y / info.fps;
	    }
		if (scope.position.y < 0) {
			scope.position.y = 0;
			scope.is_on_floor = true;
			scope.speed.y = 0;
			// console.log(CLOCK);
		}
		scope.last_position_head.x = scope.position_head.x;
		scope.last_position_head.y = scope.position_head.y;
		scope.position_head.x = scope.position.x;
		scope.position_head.y = scope.position.y+scope.human_height;

		// 击球
		if (scope.kdown) {
			scope.kdown = false;
			if (!scope.hit_status.is_hitting) {
				scope.hit_status.is_hitting = true;
				scope.hit_status.timer = scope.hit_time;
				scope.hit_status.cannot_hit = false;
			}
		}
		if (scope.hit_status.is_hitting) {	
			scope.hit_status.timer -= 1 / info.fps;

			if (scope.hit_status.timer < 0) {
				scope.hit_status.timer = 0;
				scope.hit_status.is_hitting = false;
			}
		}
	}
}

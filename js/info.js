var Info = function() {
	var scope = this;
	scope.fps = 15;
	scope.width = 1920;
	scope.height = 1080;
	scope.ground_edge = 2 / 15 * 1080; // 球场上方边界到屏幕底端的距离
	scope.service_line = 3 / 10 * 1920; // 发球线到屏幕左端的距离
	scope.net_height = 4 / 15 * 1080; // 球网高度

	scope.real_depth = 610;
	scope.real_width = 1340;
	scope.real_height = scope.real_width / scope.width * scope.height;
	scope.real_net = 155;
	scope.real_service = 460;
	scope.scale = scope.width / scope.real_width;

	scope.camera_depth = -2000; // 相机位置
	scope.focus_depth = -200; // 像平面位置

	scope.left_back_point = new Vector3(-scope.real_width/2,0,scope.real_depth);
	scope.right_back_point = new Vector3(scope.real_width/2,0,scope.real_depth);
	scope.left_front_point = new Vector3(-scope.real_width/2,0,0);
	scope.right_front_point = new Vector3(scope.real_width/2,0,0);
	scope.front_net = new Vector3(0,scope.real_net,0);
	scope.back_net = new Vector3(0,scope.real_net,scope.real_depth);
	scope.left_back_service = new Vector3(-scope.real_width/2+scope.real_service,0,scope.real_depth);
	scope.right_back_service = new Vector3(scope.real_width/2-scope.real_service,0,scope.real_depth);
	scope.left_front_service = new Vector3(-scope.real_width/2+scope.real_service,0,0);
	scope.right_front_service = new Vector3(scope.real_width/2-scope.real_service,0,0);


	scope.updateBall = function(ball) {
		scope.ball = ball;
	}

	scope.toCanvasCoord = function(pos) {
		// 输入球的坐标(厘米)，和空间一点的坐标(厘米)，返回渲染在屏幕上的像素坐标
		var f = scope.focus_depth;
		var zc = scope.camera_depth;
		var xc = scope.ball.position.x/2;
		var yc = scope.ball.position.y/2+172;

		var zp = pos.z;
		var xp = pos.x;
		var yp = pos.y;

		var z = scope.focus_depth;
		var t = (z - zc) / (zp - zc);
		var x = t * xp + (1 - t) * xc;
		var y = t * yp + (1 - t) * yc;

		x += scope.real_width / 2;
		x *= scope.scale;

		y = scope.real_height - y;
		y *= scope.scale;

		return [x, y];
	}
}

var info = new Info();

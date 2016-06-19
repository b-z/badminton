$(document).ready(function() {
	~ function() {
		var loader = new Loader();
		// var info = new Info();
		info.service_line_offset = (info.width / 2 - info.service_line) / (info.height - info.ground_edge / 2) * info.ground_edge / 2;
		var paintbrush = new Paintbrush($('#canv'), info);
		loader.loadImages(paintbrush, function() {

			var ball = new Ball(info, new Vector3(0, 0, info.real_depth / 2), 30 / 180 * Math.PI);
			// console.log(ball);
			info.updateBall(ball);
			var player1 = new Player(info, new Vector3(-300, 0, info.real_depth / 2), 172, 1, false);
			var player2 = new Player(info, new Vector3(500, 100, info.real_depth / 2), 190, 2, false);

			paintbrush.drawBackground();
			if (paintbrush.debug) {
				paintbrush.drawDebug();
			}

			$('#canv')[0].addEventListener('mouseup', function(e) {
				// console.log(e);
				var x = (e.offsetX / $('#canv').width() * info.width - info.width / 2) / info.scale;
				var y = (info.height - e.offsetY / $('#canv').width() * info.width) / info.scale;

				var vx = (1000 + Math.random() * 2000)*(x<0?1:-1);
				var vy = 500 + Math.random() * 1000;
				ball.hitDebug(new Vector(x, y), new Vector(vx, vy), 0, paintbrush);
				Materialize.toast(vx+' '+vy, 1000);

				//
				// paintbrush.drawBall(ball);
				// paintbrush.drawPlayer(player1);
				// paintbrush.drawPlayer(player2);
				// ball.position.x = x;
				// ball.position.y = y;
			});

			addEventListener('keydown', function(e) {
				switch (e.keyCode) {
					case 38:
						// 上
						break;
					case 40:
						// 下
						break;
					case 37:
						// 左
						break;
					case 39:
						// 右
						break;
					case 87:
						// w
						break;
					case 83:
						// s
						break;
					case 65:
						// a
						break;
					case 68:
						// d
						break;

					default:
						console.log(e.keyCode);
				}
			});
			// setInterval(function(){

			// ball.position.x+=Math.random()*10-5;
			// ball.position.y+=Math.random()*10-5;
			// },1000/60);
			$('#repaint_btn').click(function(){
				paintbrush.drawBackground();
			});
		});
	}();
});

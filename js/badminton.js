var data, TIMER = 0;
var CLOCK = 0;

$(document).ready(function() {
	~ function() {
		var loader = new Loader();
		// var info = new Info();
		info.service_line_offset = (info.width / 2 - info.service_line) / (info.height - info.ground_edge / 2) * info.ground_edge / 2;
		var paintbrush = new Paintbrush($('#canv'), info);
		loader.loadImages(paintbrush, function() {

			var ball = new Ball(new Vector3(0, 0, info.real_depth / 2), 30 / 180 * Math.PI);
			// console.log(ball);
			// info.updateBall(ball);
			var player1 = new Player(new Vector3(-500, 0, info.real_depth / 2), 190, 1, false, 620, 450);
			var player2 = new Player(new Vector3(300, 0, info.real_depth / 2), 172, 2, false, 500, 500);

			// paintbrush.drawBackground();
			// if (paintbrush.debug) {
			// 	paintbrush.drawDebug();
			// }

			$('#canv')[0].addEventListener('mouseup', function(e) {
				// console.log(e);
				var x = (e.offsetX / $('#canv').width() * info.width - info.width / 2) / info.scale;
				var y = (info.height - e.offsetY / $('#canv').width() * info.width) / info.scale;

				var vx = (1000 + Math.random() * 2000)*(x<0?1:-1);
				var vy = 500 + Math.random() * 1000;
				// ball.hitDebug(new Vector(x, y), new Vector(vx, vy), 0, paintbrush);
				ball.hit(new Vector(x, y), new Vector(vx, vy), CLOCK);
				Materialize.toast(x+' '+y+' '+vx+' '+vy, 1000);

				//
				// paintbrush.drawBall(ball);
				// paintbrush.drawPlayer(player1);
				// paintbrush.drawPlayer(player2);
				// ball.position.x = x;
				// ball.position.y = y;
			});

			addEventListener('keydown', function(e) {
				if (e.repeat) return;
				switch (e.keyCode) {
					case 38:
						// 上
						player2.kup = true;
						break;
					case 40:
						// 下
						player2.kdown = true;
						break;
					case 37:
						// 左
						player2.kleft = true;
						break;
					case 39:
						// 右
						player2.kright = true;
						break;
					case 87:
						// w
						player1.kup = true;
						break;
					case 83:
						// s
						player1.kdown = true;
						break;
					case 65:
						// a
						player1.kleft = true;
						break;
					case 68:
						// d
						player1.kright = true;
						break;

					default:
						console.log(e.keyCode);
				}
			});

			addEventListener('keyup', function(e) {
				switch (e.keyCode) {
					case 38:
						// 上
						player2.kup = false;
						break;
					case 40:
						// 下
						player2.kdown = false;
						break;
					case 37:
						// 左
						player2.kleft = false;
						break;
					case 39:
						// 右
						player2.kright = false;
						break;
					case 87:
						// w
						player1.kup = false;
						break;
					case 83:
						// s
						player1.kdown = false;
						break;
					case 65:
						// a
						player1.kleft = false;
						break;
					case 68:
						// d
						player1.kright = false;
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

			data = {
				ball: ball,
				player1: player1,
				player2: player2,
				brush: paintbrush,
				score: [0, 0],
			};

			startGame();
		});
	}();
});

function startGame() {
	if (TIMER) clearInterval(TIMER);
	data.serving = (Math.random() > 0.5 ? '1':'2');
	TIMER = setInterval(stepOver, 1000 / info.fps);
}

function stepOver() {
	CLOCK++;
	drawOneFrame();
	data.ball.stepOver();
	data.player1.stepOver();
	data.player2.stepOver();
	if (data.player1.hit_status.is_hitting) {
		data.player1.checkHit(data.ball);
	}
	if (data.player2.hit_status.is_hitting) {
		data.player2.checkHit(data.ball);
	}
}

function drawOneFrame() {
	if ($('#paint_bg')[0].checked) {
		data.brush.drawBackground();
	}
	data.brush.drawDebug();
	data.brush.drawPlayer(data.player1);
	data.brush.drawPlayer(data.player2);
	data.brush.drawBall(data.ball);
}


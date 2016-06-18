$(document).ready(function() {
	~ function() {
		var loader = new Loader();
		// var info = new Info();
		info.service_line_offset = (info.width / 2 - info.service_line) / (info.height - info.ground_edge / 2) * info.ground_edge / 2;
		var paintbrush = new Paintbrush($('#canv'), info);
		loader.loadImages(paintbrush, function() {

			var ball = new Ball(info, new Vector3(0, 0, info.real_depth / 2), 30 / 180 * Math.PI);
			console.log(ball);
			info.updateBall(ball);
			var player1 = new Player(info, new Vector3(-300, 0, info.real_depth / 2), 172, 1, false);
			var player2 = new Player(info, new Vector3(500, 100, info.real_depth / 2), 190, 2, false);

			$('#canv')[0].addEventListener('mousemove', function(e) {
				// console.log(e);
				paintbrush.drawBackground();
				if (paintbrush.debug) {
					paintbrush.drawDebug();
				}

				paintbrush.drawBall(ball);
				paintbrush.drawPlayer(player1);
				paintbrush.drawPlayer(player2);
				ball.position.x = (e.offsetX / $('#canv').width() * info.width - info.width / 2) / info.scale;
				ball.position.y = (info.height - e.offsetY / $('#canv').width() * info.width) / info.scale;
			});
			// setInterval(function(){

			// ball.position.x+=Math.random()*10-5;
			// ball.position.y+=Math.random()*10-5;
			// },1000/60);
		});
	}();
});

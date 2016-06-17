$(document).ready(function() {
	~ function() {
		var loader = new Loader();
		var info = new Info();
		info.service_line_offset = (info.width / 2 - info.service_line) / (info.height - info.ground_edge / 2) * info.ground_edge / 2;
		var paintbrush = new Paintbrush($('#canv'), info);
		loader.loadImages(paintbrush, function() {
			paintbrush.drawBackground();
			if (paintbrush.debug) {
				paintbrush.drawDebug();
			}
			var ball = new Ball(info, new Vector(100, 200), 30 / 180 * Math.PI);
			// console.log(ball);
			var player1 = new Player(info, new Vector(-500, 0), 172, 1, false);
			var player2 = new Player(info, new Vector(700, 200), 190, 2, false);

			paintbrush.drawBall(ball);
			paintbrush.drawPlayer(player1);
			paintbrush.drawPlayer(player2);
		});
	}();
});

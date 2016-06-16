var Paintbrush = function() {
	var scope = this;

	scope.images = [];

	scope.putImage = function() {
		var fi = images['flag1'];
		var size = 50;
		var xpos = x - size / 2;
		var ypos = y - size / 2;
		ctx.save();
		ctx.drawImage(fi, xpos, ypos, size, size);
		ctx.restore();
	}
}

$(document).ready(function() {
	~ function() {
		var loader = new Loader();
		var paintbrush = new Paintbrush($('#canv'));
		loader.loadImages(paintbrush, paintbrush.loadFinish);
	}();
});

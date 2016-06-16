$(document).ready(function() {
	~ function() {
		var loader = new Loader();
		var info = {
			width: 1920,
			height: 1080,
			ground_edge: 2/15*1080, // 球场上方边界到屏幕底端的距离
			service_line: 3/10*1920, // 发球线到屏幕左端的距离
			net_height: 4/15*1080 //球网高度
		};
		info.service_line_offset = (info.width/2-info.service_line)/(info.height-info.ground_edge/2)*info.ground_edge/2;
		var paintbrush = new Paintbrush($('#canv'), info);
		loader.loadImages(paintbrush, paintbrush.loadFinish);
	}();
});

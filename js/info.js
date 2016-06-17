var Info = function() {
	var scope = this;
	scope.width = 1920;
	scope.height = 1080;
	scope.ground_edge = 2 / 15 * 1080; // 球场上方边界到屏幕底端的距离
	scope.service_line = 3 / 10 * 1920; // 发球线到屏幕左端的距离
	scope.net_height = 4 / 15 * 1080; // 球网高度
}

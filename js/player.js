var Player = function(info, pos, human_height, id, isAI) {
	// 坐标是以脚部为基准的，另有记录身高等信息
	// 身高是胳膊的旋转轴
	var scope = this;

	scope.info = info;
	scope.id = id;
	scope.isAI = isAI;
	scope.human_height = human_height / 155 * (scope.info.net_height - scope.info.ground_edge / 2);

	scope.position = pos;
	scope.position_c = new Vector(0, 0);

	scope.updateCanvasCoordinate = function() {
		// 绘制之前调用此函数
		scope.position_c.x = scope.position.x + scope.info.width / 2;
		scope.position_c.y = scope.info.height - scope.info.ground_edge / 2 - scope.position.y - scope.human_height;
	}

	scope.updateCanvasCoordinate();
}

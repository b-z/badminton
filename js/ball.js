var Ball = function(info, pos, rot) {
	// 默认是朝上的，逆时针为正
	// 位置对于球的原点为判定点(头部)，对于场景的原点为地面、场地中线，左负右正，下负上正
	var scope = this;

	scope.info = info;
	scope.position = pos;
	scope.rotation = rot;

	scope.speed = new Vector(0, 0);

	scope.position_c = new Vector(0, 0);

	scope.updateCanvasCoordinate = function() {
		// 绘制之前调用此函数
		scope.position_c.x = scope.position.x + scope.info.width / 2;
		scope.position_c.y = scope.info.height - scope.info.ground_edge / 2 - scope.position.y;
	}

	scope.updateCanvasCoordinate();
}

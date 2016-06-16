var Loader = function() {
	var scope = this;

	scope.count = 0;
	scope.base = 'img/';
	scope.image_list = ['bg.png'];

	scope.loadImages = function(brush_object) {
		scope.image_list.forEach(function(e, i) {
			var tmp = new Image();
			tmp.src = scope.base + e;
			tmp.onload = function() {
				scope.count++;
				if (scope.count == scope.image_list.length) {
					scope.loadFinish();
				}
			}
			brush_object.images[e] = tmp;
		});
	}

	scope.loadFinish = function() {
		Materialize.toast('finish!', 3000);
	}
}

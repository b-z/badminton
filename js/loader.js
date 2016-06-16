var Loader = function() {
	var scope = this;

	scope.count = 0;
	scope.base = 'img/';
	scope.image_list = ['background.jpg', 'start.png'];

	scope.loadImages = function(brush_object, foo) {
		scope.image_list.forEach(function(e, i) {
			var tmp = new Image();
			tmp.src = scope.base + e;
			tmp.onload = function() {
				scope.count++;
				console.log('%c' + e + ' %cloaded', 'color:blue', 'color:black');
				if (scope.count == scope.image_list.length) {
					scope.loadFinish(foo);
				}
			}
			brush_object.images[e.split('.')[0]] = tmp;
		});
	}

	scope.loadFinish = function(foo) {
		Materialize.toast('Load finish!', 1000);
		foo();
	}
}

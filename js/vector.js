var Vector = function(x, y) {
	var scope = this;

	scope.x = x;
	scope.y = y;

	scope.add = function(p){
		scope.x += p.x;
		scope.y += p.y;
	}
	scope.sub = function(p){
		scope.x -= p.x;
		scope.y -= p.y;
	}
}

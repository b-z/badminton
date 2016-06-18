var Vector3 = function(x, y, z) {
	var scope = this;

	scope.x = x;
	scope.y = y;
	scope.z = z;

	scope.add = function(p){
		scope.x += p.x;
		scope.y += p.y;
		scope.z += p.z;
	}
	scope.sub = function(p){
		scope.x -= p.x;
		scope.y -= p.y;
		scope.z -= p.z;
	}
}

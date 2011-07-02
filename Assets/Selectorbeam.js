var dx = -1.0; var dy = -1.0; var dz = -1.0;
var willUpdate=false;

function Move (x,y,z) {
	dx = x;
	dy = y;
	dz = z;
	willUpdate=true;
}

function Update () {
	
	if (!willUpdate) return;

	if (dx == -1 || dy == -1 || dz == -1) return;
	
	var dm = Vector3(dx,dy,dz) - gameObject.transform.position;
	
	gameObject.transform.Translate(dm*Time.deltaTime*5,Space.World);
	
	if (gameObject.transform.position == Vector3(dx,dy,dz))
		willUpdate=false;

}
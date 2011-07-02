var x = 10;
var y = 10;
var z = 10;
var sx = 0;
var sy = 0;
var sz = 0;
var cubes = new Array();
var selectedCube = -1;
var Gridbox : Transform;
var SelectorSquare : Transform;
var SelectorBeam_x;
var SelectorBeam_y;
var SelectorBeam_z;

function CreateCube(ix,iy,iz) {
	var cube = Instantiate(Gridbox,Vector3(ix,iy,iz),Quaternion.identity);
	cube.name = "cube_"+ix+"_"+iy+"_"+iz;
	return cube;
}

function GetCubeId(px,py,pz,side) { //returns the cube at specified coords. side is 0 or 1
	var cubeid = px*1+py*x+pz*y;
	if (side > 0) cubeid += x*y*z;
	return cubeid;
}

function SelectCube(px,py,pz,side) {
	if (px >= 0) sx = px;
	if (py >= 0) sy = py;
	if (pz >= 0) sz = pz;
	var cubeid = GetCubeId(sx,sy,sz,side);
	if (selectedCube > -1) cubes[selectedCube].renderer.material.color = Color.white;
	selectedCube = cubeid;
	cubes[cubeid].renderer.material.color = Color.red;
	
	var xmove;
	var ymove;
	var zmove;
	
	/*xmove = -SelectorBeam_x.transform.localPosition + Vector3(x*0.5-0.5,sy,sz);
	ymove = -SelectorBeam_y.transform.localPosition + Vector3(sx,y*0.5-0.5,sz);
	zmove = -SelectorBeam_z.transform.localPosition + Vector3(sx,sy,z*0.5-0.5);
	
	SelectorBeam_x.transform.Translate(xmove,Space.World);
	SelectorBeam_y.transform.Translate(ymove,Space.World);
	SelectorBeam_z.transform.Translate(zmove,Space.World);*/
	
	SelectorBeam_x.GetComponent("Selectorbeam").Move(x*0.5-0.5,sy,sz);
	SelectorBeam_y.GetComponent("Selectorbeam").Move(sx,y*0.5-0.5,sz);
	SelectorBeam_z.GetComponent("Selectorbeam").Move(sx,sy,z*0.5-0.5);
	
}

function CreateGUI() {
	var gx; var gy; var gz;
	var px; var py; var pz;
	var square;
	var sqscript;
	
	//xy square
	for (gy = 0; gy < y; gy++) {
		for (gx = 0; gx < x; gx++) {
			px = gx;
			py = gy;
			pz = -1.0;
			
			square = Instantiate(SelectorSquare,Vector3(px,py,pz),Quaternion.identity);
			square.transform.eulerAngles.x = -90.0;
			
			sqscript = square.GetComponent("SelectorSquare");
			sqscript.x = gx;
			sqscript.y = gy;
			sqscript.z = -1;
		}	
	}
	
	//xz square
	for (gz = 0; gz < z; gz++) {
		for (gx = 0; gx < x; gx++) {
			px = gx;
			py = y;
			pz = gz;
			
			square = Instantiate(SelectorSquare,Vector3(px,py,pz),Quaternion.identity);
			//square.transform.eulerAngles.x = -90.0;
			
			sqscript = square.GetComponent("SelectorSquare");
			sqscript.x = gx;
			sqscript.y = -1;
			sqscript.z = gz;
			if(!gz&&!gx)
				toSelX=sqscript;
		}	
	}
	
	//yz square
	for (gz = 0; gz < z; gz++) {
		for (gy = 0; gy < y; gy++) {
			px = -1.0;
			py = gy;
			pz = gz;
			
			square = Instantiate(SelectorSquare,Vector3(px,py,pz),Quaternion.identity);
			square.transform.eulerAngles.z = 90.0;
			
			sqscript = square.GetComponent("SelectorSquare");
			sqscript.x = -1;
			sqscript.y = gy;
			sqscript.z = gz;
			if(!gz&&(gy==(y-1)))
				toSelY=sqscript;
		}	
	}
	
	SelectorBeam_x = GameObject.Find("Selectorbeam_x");
	SelectorBeam_y = GameObject.Find("Selectorbeam_y");
	SelectorBeam_z = GameObject.Find("Selectorbeam_z");
	
	SelectorBeam_x.transform.localScale.y = x/2.75;
	SelectorBeam_y.transform.localScale.y = y/2.75;
	SelectorBeam_z.transform.localScale.y = z/2.75;
	
	SelectorBeam_x.transform.position = Vector3(x*0.5-0.5,y*0.5-0.5,z*0.5-0.5);
	SelectorBeam_y.transform.position = Vector3(x*0.5-0.5,y*0.5-0.5,z*0.5-0.5);
	SelectorBeam_z.transform.position = Vector3(x*0.5-0.5,y*0.5-0.5,z*0.5-0.5);
	
	SelectCube(toSelX.x,toSelX.y,toSelX.z,0);
	SelectCube(toSelY.x,toSelY.y,toSelY.z,0);
}

function Start () {
	var ix;
	var iy;
	var iz;
	for (iz = 0;iz<z;iz++) {
		for (iy = 0;iy<y;iy++) {
			for (ix = 0;ix<x;ix++) {
				cubes.Add(CreateCube(ix,iy,iz));
			}
		}
	}
	
	for (iz = 0;iz<z;iz++) {
		for (iy = 0;iy<y;iy++) {
			for (ix = 0;ix<x;ix++) {
				cubes.Add(CreateCube(ix+x+x*0.5,iy,iz));
			}
		}
	}
	
	CreateGUI();
	
	gameObject.transform.Translate(x+x*0.25,y*0.5,z*0.5);
	var script = gameObject.GetComponent("WorldScript");
}

function Update () {
	
}
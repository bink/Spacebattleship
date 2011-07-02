var x = 0;
var y = 0;
var z = 0;

function OnMouseEnter () {
	gameObject.renderer.material.color = Color.blue;	
}

function OnMouseExit() {
	gameObject.renderer.material.color = Color.white;
	gameObject.renderer.material.color.a = 200/255.0;
}

function OnMouseDown() {
	var worldscript = GameObject.Find("World").GetComponent("WorldScript");
	worldscript.SelectCube(x,y,z,0);
	gameObject.renderer.material.color = Color.red;
}

function Update () {
}
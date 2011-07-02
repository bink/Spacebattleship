var speed = 100;

function Update () {
	gameObject.transform.rotation.y += Time.deltaTime * 0.0001 * speed;
}
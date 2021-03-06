var container;
var camera, scene, renderer;
var controller1, controller2;

var raycaster, intersected = [];
var tempMatrix = new THREE.Matrix4();

var group;
var loader;
var textureLoader;
var testing = new THREE.Geometry();

init();
generateRoom();
generateBucket(new THREE.Vector3(1.5,1,-1));
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x808080 );

	camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 10 );

	scene.add( new THREE.HemisphereLight( 0x808080, 0x606060 ) );

	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 0, 6, 0 );
	light.castShadow = true;
	light.shadow.camera.top = 2;
	light.shadow.camera.bottom = - 2;
	light.shadow.camera.right = 2;
	light.shadow.camera.left = - 2;
	light.shadow.mapSize.set( 4096, 4096 );
	scene.add( light );

	group = new THREE.Group();
	scene.add( group );

	var geometry = new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 );
	var material = new THREE.MeshStandardMaterial( {
		color: Math.random() * 0xffffff,
		roughness: 0.7,
		metalness: 0.0
	} );
	var cube = new THREE.Mesh( geometry, material );
	cube.name = "cube";
	cube.position.z = -5;
	cube.position.y = 0;
	cube.position.x = 0;
	var wireframe = new THREE.WireframeGeometry(geometry);
	var line = new THREE.LineSegments( wireframe );
	line.material.depthTest = false;
	line.material.opacity = 0.25;
	line.material.transparent = true;

	group.add( line );
	group.add(cube);
	var cube1 = new THREE.Mesh( geometry, material );
	cube1.position.z = 1;
	cube1.position.y = 0;
	cube1.position.x = -1;
	group.add(cube1);
	var cube2 = new THREE.Mesh( geometry, material );
	cube2.position.z = 0;
	cube2.position.y = 0;
	cube2.position.x = 1;
	group.add(cube2);
	var cube3 = new THREE.Mesh( geometry, material );
	cube3.position.z = 0;
	cube3.position.y = 1;
	cube3.position.x = 0;
	group.add(cube3);

	loader = new THREE.OBJLoader();
	textureLoader = new THREE.TextureLoader();
<<<<<<< HEAD:WebVRThreeJS/alt-script.js

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	renderer.vr.enabled = true;
	container.appendChild( renderer.domElement );

	addControllers(controller1,controller2,scene);

	document.body.appendChild( WEBVR.createButton( renderer ) );
	raycaster = new THREE.Raycaster();
	window.addEventListener( 'resize', onWindowResize, false );
}

function generateBucket(vector3){
	loader.load('./Assets/Bucket/Bucket.obj', function(object){
		var colorMap = textureLoader.load('./Assets/Bucket/Bucket_Base_color.png');
		var normalMap = textureLoader.load('./Assets/Bucket/Bucket_Normal.png');
		var roughnessMap = textureLoader.load('./Assets/Bucket/Bucket_Roughness.png');
		var material = getMaterial('standard','rgb(255,255,255)');

		object.traverse(function(child){
			child.material = material;
			material.roughnessMap = roughnessMap;
			material.map = colorMap;
			material.normalMap = normalMap;
		});
		object.name = "Bucket";
		object.scale.x = 5;
		object.scale.y = 5;
		object.scale.z = 5;
		object.position.x = vector3.x;
		object.position.y = vector3.y;
		object.position.z = vector3.z;
		group.add(object);
	});
}

function generateRoom(){
	loader.load('./Assets/VRmeer\ Room/VRmeer.obj', function(object){
		var colorMap = textureLoader.load('./Assets/Texture/Lava.jpg');
		var material = getMaterial('standard','rgb(255,255,255)');

		object.traverse(function(child){
			child.material = material;
			material.map = colorMap;
		});
		object.name = "Room";
		object.scale.x = 0.01;
		object.scale.y = 0.01;
		object.scale.z = 0.01;
		object.position.y = 0;
		object.position.x = -1;
		scene.add(object);
	});
}

function generateHead(vector3){
=======
//for (var i = 0; i < 4; i++) {
>>>>>>> refs/remotes/ColinvD/master:WebVRThreeJS/script.js
	loader.load('./Assets/Head/lee-perry-smith-head-scan.obj', function (object) {
		var colorMap = textureLoader.load('./Assets/Head/Face_Color.jpg');
		var bumpMap = textureLoader.load('./Assets/Head/Face_Disp.jpg');
		var faceMaterial = getMaterial('standard', 'rgb(255, 255, 255)');

		object.traverse(function(child) {
			if (child.name == 'Plane') {
				child.visible = false;
			}
			if (child.name == 'Infinite') {
				child.material = faceMaterial;
				faceMaterial.roughness = 0.875;
				faceMaterial.map = colorMap;
				faceMaterial.roughnessMap = bumpMap;
				faceMaterial.metalness = 0.1;
				faceMaterial.bumpScale = 0.175;
			}
<<<<<<< HEAD:WebVRThreeJS/alt-script.js
		});
=======
		} );

		/*object.scale.x = 20;
		object.scale.y = 20;
		object.scale.z = 20;

		object.position.z = 0;
		object.position.y = 0;
		scene.add(object);*/
>>>>>>> refs/remotes/ColinvD/master:WebVRThreeJS/script.js
		object.name = "Face";
		object.scale.x = 10;
		object.scale.y = 10;
		object.scale.z = 10;
<<<<<<< HEAD:WebVRThreeJS/alt-script.js
		object.position.x = vector3.x;
		object.position.y = vector3.y;
		object.position.z = vector3.z;
		group.add(object);
		});
}

function loadTest(){
	var xLimit = 3;
	var yLimit = 3;

	for(var i=0; i<xLimit;i++){
		for(var j=0;j<yLimit;j++){
			generateHead(new THREE.Vector3(-xLimit/1.5+j*2,-yLimit/2+i*1.5,-3));
		}
	}
}

function animate() {
=======

		object.position.z = -3;
		object.position.y = -0.1;
		object.position.x = 0;
		//object.bbox = new THREE.Box3().setFromObject(object);
		//testing.vertices.push(object.vertices);
		//testing.faces.push(object.faces);
		group.add(object);
		object.parent = cube;
		//var secondHead = new THREE.Mesh(testing, faceMaterial);
		//scene.add(secondHead);
	});
//}

//group.children[0].children.add(group.children[1]);

console.log(group);

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	renderer.vr.enabled = true;
	container.appendChild( renderer.domElement );

	addControllers(controller1,controller2,scene);

	document.body.appendChild( WEBVR.createButton( renderer ) );
	raycaster = new THREE.Raycaster();
	window.addEventListener( 'resize', onWindowResize, false );
}

/*function rotate(name){
	var _name = name;
	var _object = scene.getObjectByName(_name);
	console.log(_object);
	_object.rotation.x += 0.1;
	_object.rotation.y += 0.1;
	_object.rotation.z += 0.1;
}*/

function animate() {
	//rotate("Face");
>>>>>>> refs/remotes/ColinvD/master:WebVRThreeJS/script.js
	renderer.setAnimationLoop( render );
}

function render() {
	cleanIntersected();
	intersectObjects( controller1 );
	intersectObjects( controller2 );
	renderer.render( scene, camera );
}

function addControllers(){
	controller1 = renderer.vr.getController( 0 );
	controller1.addEventListener( 'selectstart', onSelectStart );
	controller1.addEventListener( 'selectend', onSelectEnd );
	scene.add( controller1 );

	controller2 = renderer.vr.getController( 1 );
	controller2.addEventListener( 'selectstart', onSelectStart );
	controller2.addEventListener( 'selectend', onSelectEnd );
	scene.add( controller2 );
  addControllerLines();
}

function addControllerLines(){
  var geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );
  var line = new THREE.Line( geometry );
  line.name = 'line';
  line.scale.z = 5;

  controller1.add( line.clone() );
  controller2.add( line.clone() );
}

function getMaterial(type, color) {
	var selectedMaterial;
	var materialOptions = {
		color: color === undefined ? 'rgb(255, 255, 255)' : color,
	};

	switch (type) {
		case 'basic':
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
		case 'lambert':
			selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
			break;
		case 'phong':
			selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
			break;
		case 'standard':
			selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
			break;
		default:
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
	}

	return selectedMaterial;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onSelectStart( event ) {
	var controller = event.target;
	var intersections = getIntersections( controller );

	if ( intersections.length > 0 ) {
		var intersection = intersections[ 0 ];

		tempMatrix.getInverse( controller.matrixWorld );

		var object = intersection.object;
		object.matrix.premultiply( tempMatrix );
		object.matrix.decompose( object.position, object.quaternion, object.scale );
		object.material.emissive.b = 1;
		controller.add( object );

		controller.userData.selected = object;
	}
}

function onSelectEnd( event ) {
	var controller = event.target;

	if ( controller.userData.selected !== undefined ) {
		var object = controller.userData.selected;
		object.matrix.premultiply( controller.matrixWorld );
		object.matrix.decompose( object.position, object.quaternion, object.scale );
		object.material.emissive.b = 0;
		group.add( object );

		controller.userData.selected = undefined;
	}
}

function getIntersections( controller ) {

	tempMatrix.identity().extractRotation( controller.matrixWorld );

	raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
	raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );

	return raycaster.intersectObjects( group.children );

}

function intersectObjects( controller ) {

	// Do not highlight when already selected

	if ( controller.userData.selected !== undefined ) return;

	var line = controller.getObjectByName( 'line' );
	var intersections = getIntersections( controller );

	if ( intersections.length > 0 ) {
		var intersection = intersections[ 0 ];

		var object = intersection.object;
		object.material.emissive.r = 1;
		intersected.push( object );

		line.scale.z = intersection.distance;
	} else {
		line.scale.z = 5;
	}
}

function cleanIntersected() {
	while ( intersected.length ) {
		var object = intersected.pop();
		object.material.emissive.r = 0;
	}
}

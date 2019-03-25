var container;
var camera, scene, renderer;
var controller1, controller2;

var raycaster, intersected = [];
var tempMatrix = new THREE.Matrix4();

var group;
var loader;
var textureLoader;

init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x808080 );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 10 );

	var geometry = new THREE.PlaneBufferGeometry( 4, 4 );
	var material = new THREE.MeshStandardMaterial( {
		color: 0xeeeeee,
		roughness: 1.0,
		metalness: 0.0
	} );
	var floor = new THREE.Mesh( geometry, material );
	floor.rotation.x = - Math.PI / 2;
	floor.receiveShadow = true;
	scene.add( floor );

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

	loader = new THREE.OBJLoader();
	textureLoader = new THREE.TextureLoader();

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
				faceMaterial.bumpMap = bumpMap;
				faceMaterial.roughnessMap = bumpMap;
				faceMaterial.metalness = 0;
				faceMaterial.bumpScale = 0.175;
			}
		} );

		object.scale.x = 20;
		object.scale.y = 20;
		object.scale.z = 20;

		object.position.z = 0;
		object.position.y = 0;
		scene.add(object);
	});

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	renderer.vr.enabled = true;
	container.appendChild( renderer.domElement );

	AddControllers(controller1,controller2,scene);

	document.body.appendChild( WEBVR.createButton( renderer ) );
	raycaster = new THREE.Raycaster();
	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	renderer.setAnimationLoop( render );
}

function render() {
	cleanIntersected();
	intersectObjects( controller1 );
	intersectObjects( controller2 );
	renderer.render( scene, camera );
}

function AddControllers(){
	controller1 = renderer.vr.getController( 0 );
	controller1.addEventListener( 'selectstart', onSelectStart );
	controller1.addEventListener( 'selectend', onSelectEnd );
	scene.add( controller1 );

	controller2 = renderer.vr.getController( 1 );
	controller2.addEventListener( 'selectstart', onSelectStart );
	controller2.addEventListener( 'selectend', onSelectEnd );
	scene.add( controller2 );
  AddControllerLines();
}

function AddControllerLines(){
  var geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );
  var line = new THREE.Line( geometry );
  line.name = 'line';
  line.scale.z = 5;

  controller1.add( line.clone() );
  controller2.add( line.clone() );
}

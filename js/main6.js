//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#00ffb3');

  //Camera setup    
  const fov = 100;
  const aspect = container.clientWidth * .74/ container.clientHeight;
  const near = 0.001;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, .7);
  
    //GridVis
    
    const size = 5;
    const divisions = 200;
    const colorGrid = '#28d155';

    const gridHelper = new THREE.GridHelper( size, divisions, colorGrid );
    scene.add( gridHelper );
    grid = gridHelper;
 
    
  //Light setup
  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  
    
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth * .74, container.clientHeight * 1.0);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Models
  let loader = new THREE.GLTFLoader();
    
  loader.load("obj/CARDIOGLTF4.gltf", function(gltf) {
    scene.add(gltf.scene);
    heart = gltf.scene;
    animate();
  });
    
}


function animate() {
  
    grid.rotation.x = 80;
    heart.rotation.x = 179.08;
    heart.rotation.z = 0;
    heart.position.x = .1;
    heart.position.y = -.7;
    
    
    
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
    
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth * .74/ container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth * .74, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

//Orbit Controls
  controls = new THREE.OrbitControls( camera, renderer.domElement);
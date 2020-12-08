//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;
let controls;
let clock;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#24ad4a');

  //Camera setup    
  const fov = 85;
  const aspect = container.clientWidth * .8/ container.clientHeight;
  const near = 0.1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 1, 1.5);
  
  //Light setup
  const ambient = new THREE.AmbientLight(0x404040, 3);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(50, 50, 100);
  scene.add(light);
    
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth * .8, container.clientHeight * 1.0);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Models
  let loader = new THREE.GLTFLoader();
    
  loader.load("obj/Palos.gltf", function(gltf) {
    scene.add(gltf.scene);
    palos = gltf.scene;
    animate();
  });
    
}
 
function animate() {
 
  palos.position.y = -.8;
  palos.position.x = 4;
  palos.position.z = -2;
  
  controls.lock();
  processKeyboard();
    
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
    
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth * .8/ container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth * .8, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

//orbital controls
controls = new THREE.PointerLockControls( camera, renderer.domElement);

let keyboard = [];

addEventListener('keydown',(e)=>{
    keyboard[e.key] = true;
});

addEventListener('keyup',(e)=>{
    keyboard[e.key] = false;
});

function processKeyboard() {
    if(keyboard['w']){
        controls.moveForward(0.02);
    }
    if(keyboard['s']){
        controls.moveForward(-0.02);
    }
    if(keyboard['a']){
        controls.moveRight(-0.02);
    }
    if(keyboard['d']){
        controls.moveRight(0.02);
    }
}



        
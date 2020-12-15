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
  scene.background = new THREE.Color('#17ddeb');

  //Camera setup    
  const fov = 35;
  const aspect = container.clientWidth * .74/ container.clientHeight;
  const near = 0.1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 80);
  
  //GridVis
    
    const size = 100;
    const divisions = 100;
    const colorGrid = '#28d155';

    const gridHelper = new THREE.GridHelper( size, divisions, colorGrid );
    scene.add( gridHelper );
    grid = gridHelper;
 
      
    
  //Light setup
  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(50, 50, 100);
  scene.add(light);
    
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth * .74, container.clientHeight * 1.0);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Models
  let loader = new THREE.GLTFLoader();
    
  loader.load("obj/facesnew.gltf", function(gltf) {
    scene.add(gltf.scene);
    face = gltf.scene;
    animate();
  });
     
  loader.load("obj/absform.gltf", function(gltf) {
    scene.add(gltf.scene);
    absform = gltf.scene;
    animate();
  });
    
   loader.load("obj/person.gltf", function(gltf) {
    scene.add(gltf.scene);
    person = gltf.scene;
    person.position.set(0,-1,0);   
    animate();
  });
  
}


function animate() {

  grid.position.y = -10;
  
  face.rotation.y += .005;
  absform.rotation.z += .05;
  absform.rotation.y += .05;
  absform.rotation.x += .05;
    
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

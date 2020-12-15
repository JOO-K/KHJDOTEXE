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
  scene.background = new THREE.Color('#ff03c0');

  //Camera setup    
  const fov = 35;
  const aspect = container.clientWidth * .74/ container.clientHeight;
  const near = 0.1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 30);
    
    
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
    
  loader.load("obj/ring1.gltf", function(gltf) {
    scene.add(gltf.scene);
    ring1 = gltf.scene;
    animate();
  });
     
  loader.load("obj/ring2.gltf", function(gltf) {
    scene.add(gltf.scene);
    ring2 = gltf.scene;
    animate();
  });
  
  loader.load("obj/ring3.gltf", function(gltf) {
    scene.add(gltf.scene);
    ring3 = gltf.scene;
    animate();
  });

  loader.load("obj/ring4.gltf", function(gltf) {
    scene.add(gltf.scene);
    ring4 = gltf.scene;
    animate();
  });

  loader.load("obj/ring5.gltf", function(gltf) {
    scene.add(gltf.scene);
    ring5 = gltf.scene;
    animate();
  });
  
  loader.load("obj/ring6.gltf", function(gltf) {
    scene.add(gltf.scene);
    ring6 = gltf.scene;
    animate();
  });
    
}


function animate() {
    
  
    grid.rotation.x = 60;
    
    ring1.rotation.x += .01;
    ring2.rotation.y += .02;
    ring3.rotation.y += .04;
    ring4.rotation.y += .06;
    ring5.rotation.y += .08;
    ring6.rotation.y += .1;
    
    ring1.rotation.z += .01;
    ring2.rotation.x += .02;
    ring3.rotation.x += .04;
    ring4.rotation.x += .06;
    ring5.rotation.x += .08;
    ring6.rotation.x += .1;
    
    ring1.rotation.y += .01;
    
    
    
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

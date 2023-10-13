import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import garageFloor from "./public/textures/garageFloor.jpg"
import stena from "./public/textures/stena.jpg"
import "./style.css";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//enable shadows
renderer.shadowMap.enabled = true;


//Light
const pointLight = new THREE.PointLight(0xffffff, 25, 100);
pointLight.position.set(-3, 4, 0); // Позиция источника света
pointLight.castShadow = true
scene.add(pointLight);


const directionalLight = new THREE.DirectionalLight("black", 1);
directionalLight.castShadow = true
scene.add(directionalLight);

directionalLight.position.set(5, 5,5);
// const lightHelper = new THREE.DirectionalLightHelper(directionalLight,5,"red");
// scene.add(lightHelper);
// const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera) ;
// scene.add(shadowHelper)

//texture loader
const textureLoader = new THREE.TextureLoader()

//3d model
const loader = new GLTFLoader();
const group = new THREE.Group();
scene.add(group);
loader.load(
  "./models/camaro/scene.gltf",
  (gltf) => {
    scene.add(gltf.scene);
    group.add(gltf.scene)
    gltf.scene.position.y += 0.2 * 1/2;
    gltf.scene.traverse((node)=>{
      if(node.isMesh) node.castShadow = true;
    })
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
const tools = new URL("./models/toolBox/scene.gltf", import.meta.url)
loader.load(
  tools.href,
  (gltf) => {
    scene.add(gltf.scene);
    
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    gltf.scene.position.set(2,0,-3)
    gltf.scene.traverse((node)=>{
      if(node.isMesh) node.castShadow = true;
    })
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const lamp = new URL("./models/lamp/scene.gltf", import.meta.url)
loader.load(
  lamp.href,
  (gltf) => {
    const model = gltf.scene;
    model.rotation.z += Math.PI * 0.5
    model.position.y += 4
    model.position.x -= 1.4
    scene.add(gltf.scene);
    
  

  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const tires = new URL("./models/tires/scene.gltf", import.meta.url)
loader.load(
  tires.href,
  (gltf) => {
    const model = gltf.scene;
    model.rotation.y += Math.PI * -0.1
    model.position.y += 1.5
    model.position.x -= 3.6
    model.position.z -= 3.5
    scene.add(gltf.scene);
    
  
    gltf.scene.traverse((node)=>{
      if(node.isMesh) node.castShadow = true;
    })
  },
  undefined,
  function (error) {
    console.error(error);
  }
);



//Floor
const floorGeometry = new THREE.PlaneGeometry(30, 30);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: "gray",
  side: THREE.DoubleSide,
  map:textureLoader.load(garageFloor)
});

floorMaterial.map.wrapS = THREE.RepeatWrapping;
floorMaterial.map.wrapT = THREE.RepeatWrapping;
floorMaterial.map.repeat.set(50, 50); // Установите количество повторений по горизонтали и вертикали
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;

//AxesHelper
// const helper = new THREE.AxesHelper(3);
// scene.add(helper);

//Cube
const geometry = new THREE.CylinderGeometry(2.5,2.5,0.1,64,1);
const material = new THREE.MeshStandardMaterial({
  color: 0xfcc742,
  emissive: 0x111111,
  specular: 0xffffff,
  metalness: 1,
  roughness: 0.55,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.receiveShadow = true
cube.position.y += 0.1 * 1/2;
group.add(cube)


// Первый прямоугольник (комната)
const geometry1 = new THREE.BoxGeometry(8, 9, 0.1); // Ширина, высота, глубина
const material1 = new THREE.MeshStandardMaterial({ color: "gray", map: textureLoader.load(stena) });
const room1 = new THREE.Mesh(geometry1, material1);
room1.receiveShadow = true
material1.map.wrapS = THREE.RepeatWrapping;
material1.map.wrapT = THREE.RepeatWrapping;
material1.map.repeat.set(3, 3); // Установите количество повторений по горизонтали и вертикали
scene.add(room1);

// Второй прямоугольник (комната)
const geometry2 = new THREE.BoxGeometry(8, 9, 0.1); // Ширина, высота, глубина
const material2 = new THREE.MeshStandardMaterial({ color: "gray", map: textureLoader.load(stena) });
const room2 = new THREE.Mesh(geometry2, material2);
material2.map.wrapS = THREE.RepeatWrapping;
material2.map.wrapT = THREE.RepeatWrapping;
material2.map.repeat.set(3, 3); // Установите количество повторений по горизонтали и вертикали
room2.receiveShadow = true
scene.add(room2);

room2.position.x += -4
room1.position.z += -4
room2.rotateY(Math.PI * 0.5)
//OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2.5;
controls.enableDamping = true;
controls.enablePan = false;
camera.position.set(0, 1.5, 6);

// let isDragging = false;
// let previousMouseX = 0;

// window.addEventListener('mousedown', (event) => {
//   isDragging = true;
//   previousMouseX = event.clientX;
//   document.body.style.cursor = 'grabbing';
// });

// window.addEventListener('mouseup', () => {
//   isDragging = false;
//   document.body.style.cursor = 'auto';
// });

// window.addEventListener('mousemove', (event) => {
//   if (isDragging) {
//     const deltaX = event.clientX - previousMouseX;
//     group.rotation.y += deltaX * 0.01; // Вращение всей группы
//     previousMouseX = event.clientX;
//   }
// });
//animate
const animate = () => {
  requestAnimationFrame(animate);
  // if(isDragging === false){
     group.rotation.y += 0.01;
  // }
 
  controls.update();

  renderer.render(scene, camera);
};

animate();

window.addEventListener("resize", () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});

import * as THREE from 'three';
import './index.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import gsap from "gsap";
// scene
const scene = new THREE.Scene();

// create sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.3
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Size
const size = {
  width: window.innerWidth,
  height: window.innerHeight
} 


// Light
const light = new THREE.PointLight(0xffffff, 1, 100, 0);
light.position.set(0, 10, 10);
light.intensity = 1.25;
scene.add(light);


// Camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);




// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;

// resize
window.addEventListener("resize", () =>{
  // update sizes
  size.width = window.innerWidth
  size.height = window.innerHeight
  // update camera
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width, size.height)
})
const loop = ()=>{
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();

// mouse animation color
let mouseOver = false;
let rgb = [];

window.addEventListener("mouseover", ()=>(mouseOver = true));
window.addEventListener("mouseout", ()=>(mouseOver = false));
window.addEventListener("mousemove", (e) =>{
  if(mouseOver){
    rgb = [
      Math.round((e.pageX / size.width) * 255),
      Math.round((e.pageY / size.height) * 255), 
      150,
    ]
// animate
let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
gsap.to(mesh.material.color, {
  r: newColor.r,
  g: newColor.g,
  b:newColor.b
  })
 }
});


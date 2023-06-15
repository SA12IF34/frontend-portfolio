import * as THREE from 'three';
import { GodRaysEffect, RenderPass, EffectPass, EffectComposer } from 'postprocessing';
import { randInt } from 'three/src/math/MathUtils.js';

let container = document.getElementById('app') as HTMLDivElement;

const pi: number = Math.PI;
let rotateDeg: number = 0.005;
let x: number = 16;
let y: number = 8;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 1000);


scene.add(camera)
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x000000, 0);
if (window.matchMedia('(min-width: 768px)').matches) {
  renderer.setPixelRatio(1.5);

} else if (window.matchMedia('(min-width: 1280px)').matches) {
  renderer.setPixelRatio(window.devicePixelRatio);
  rotateDeg = 0.002;
}

window.onresize = () => {
  renderer.setSize(innerWidth, innerHeight);
};

container.appendChild(renderer.domElement);

const obj3D = new THREE.Object3D();
scene.add(obj3D);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffe1b0, side: THREE.DoubleSide });
const core = new THREE.Mesh(geometry, material);
if (window.matchMedia('(max-width: 900px)').matches) {
  x = 10;
}
if (window.matchMedia('(max-width: 650px)').matches) {
  x = 8;
  y = 3;
  obj3D.rotateX(-pi/12)
  core.scale.set(.5, .5, .5)
}
if (window.matchMedia('(max-width: 500px)').matches) {
  x = 6;
}
obj3D.position.set(x, y, -16);
obj3D.add(core)



const effectsProperties = {
  blue: true,
  density: 0.05,
  decay: 0.93,
  weight: 0.6,
  exposure: 0.5,
  clampMax: 1,
  samples: 30
}

var raysEffect1 = new GodRaysEffect(camera, core, effectsProperties)

let meshs = [raysEffect1]
let colors: number[] = [0xfb4104, 0x1589fd, 0xf8d44c, 0xffbcbd, 0xfff654, 0xffa666]
let r: number = 3;
if (window.matchMedia('(max-width: 650px)').matches) {
  r = 1;
}

for (let i = 0; i < 6; i++) {
  var g = new THREE.TorusGeometry(i + r, 0.1, 50, 50, 4.5);
  var m = new THREE.MeshBasicMaterial({ color: colors[i] });
  var mesh = new THREE.Mesh(g, m);
  var randN = randInt(-pi, pi)
  mesh.rotateY(randN)
  mesh.rotateX(pi / 2)
  obj3D.add(mesh);
  var raysEffect2 = new GodRaysEffect(camera, mesh, effectsProperties);
  meshs.push(raysEffect2);
}

const renderPass = new RenderPass(scene, camera);
const effectsPass = new EffectPass(camera, ...meshs);
effectsPass.renderToScreen = true;

const composer = new EffectComposer(renderer);
composer.addPass(renderPass);
composer.addPass(effectsPass);



function animate() {
  requestAnimationFrame(animate)

  obj3D.rotation.y += rotateDeg;

  camera.lookAt(3, 6, -18)
  composer.render(0.1);
}

animate();

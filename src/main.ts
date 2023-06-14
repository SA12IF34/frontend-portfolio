import * as THREE from 'three';
import { GodRaysEffect, RenderPass, EffectPass, EffectComposer } from 'postprocessing';
import { randInt } from 'three/src/math/MathUtils.js';


let container = document.getElementById('app') as HTMLDivElement;
// let projectsBtn = document.getElementById("projectsBtn") as HTMLButtonElement;
// let skillsBtn = document.getElementById("skillsBtn") as HTMLButtonElement;
// let goProjectsBtn = document.getElementById("goProjectsBtn");
// let changeable = document.querySelector("div.changeable") as HTMLDivElement;
// let skills = document.querySelector("main>div.skills") as HTMLDivElement;
// let goProjects = document.querySelector('.goProjects') as HTMLDivElement;
// let contact = document.getElementById("contact") as HTMLDivElement;
// let projects = document.querySelector(".projects") as HTMLDivElement;
// let back = document.querySelector('.back') as HTMLDivElement;
// let refresh = document.querySelector(".refresh") as HTMLButtonElement;
// let backSkills = document.querySelector('.backSkills') as HTMLButtonElement;

// refresh.onclick = () => {
//   window.location.reload();
// }

randInt

const pi: number = Math.PI;
let rotateDeg: number = 0.005;
let x2: number = 16;

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
  x2 = 10;
}
if (window.matchMedia('(max-width: 650px)').matches) {
  x2 = 8;
  core.scale.set(.5, .5, .5)
}
obj3D.position.set(x2, 8, -16);
obj3D.add(core)

// const orbitControls = new OrbitControls(camera, renderer.domElement);

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

// let move = '';
let x: number, y: number, z: number;
x = 3; y = 6; z = -18;
// let skillsP = 'I have In my skills bag HTML, CSS, JavaScript, TypeScript, ReactJs, NextJs, Chakra-UI, and ThreeJs';
// let i = 0;
// let p = skills.firstElementChild as HTMLInputElement;

// function writeSkills(t1: number = 50) {
//   let intervalFunc = () => {
//     if (i < skillsP.length) {

//       p.value += skillsP[i];

//       i += 1
//     }
//     if (i === skillsP.length) {
//       goProjectsBtn.classList.remove("none");
//     }
//   }


//   let interval = setInterval(intervalFunc, t1)
// }

function animate() {
  requestAnimationFrame(animate)

  obj3D.rotation.y += rotateDeg;

//   skillsBtn.addEventListener('click', (): void => {
//     changeable.classList.add('transparent');


//     setTimeout(() => {
//       move = 'first';
//       skills.classList.remove('transparent', 'none');
//       changeable.classList.add('none')
//     }, 800)

//   });
//   projectsBtn.addEventListener('click', (): void => {
//     changeable.classList.add('transparent');

//     setTimeout(() => {
//       move = 'all';
//       skills.classList.add('transparent', 'none');
//       changeable.classList.add('none')
//     }, 800)

//   });
//   goProjectsBtn.addEventListener('click', (): void => {
//     skills.classList.add('transparent');
//     setTimeout(() => {
//       move = 'second';
//     }, 800)
//   });
//   backSkills.addEventListener('click', (): void => {
//     contact.classList.remove('contactTop');
//     projects.classList.remove('projectsAppear');
//     back.style.cssText = 'translate: 100% 0;';
//     setTimeout(() => {
//       projects.classList.add('none');
//       back.classList.add('none');
//       projects.classList.add('none');
//       goProjects.classList.add('none');
//       move = 'backskills';
//     }, 550)

//   })


//   if (move === 'backskills') {
//     camera.position.y > 1 ? camera.position.y -= 0.25 : '';
//     camera.position.z < -4 ? camera.position.z += 0.15 : '';
//     x > 6 ? x -= 0.25 : '';
//     y < 12 ? y += 0.05 : '';
//     if (window.matchMedia('(max-width: 900px)').matches) {
//       x2 > 8 ? x2 -= 0.3 : '';
//       obj3D.position.set(x2, 8, -16)
//     }
//     if (x <= 6 && y >= 12) {
//       move = ''
//       skills.classList.remove('transparent', 'none');
//       goProjects.classList.remove('transparent', 'none');
//       if (!p.value) {
//         p.focus();
//         goProjects.addEventListener('click', e => {
//           e.preventDefault();
//           p.focus();
//         })
//         setTimeout(() => {
//           writeSkills(100);

//         }, 1000);
//       }
//     }
//   }


//   if (move === 'first' || move === 'all') {
//     camera.position.x < 10 ? camera.position.x += 0.375 : '';
//     camera.position.y < 1 ? camera.position.y += 0.0375 : '';
//     camera.position.z > -4 ? camera.position.z -= 0.15 : '';
//     x < 6 ? x += 0.1125 : '';
//     y < 12 ? y += 0.225 : '';
//     z < -16 ? z += 0.075 : '';

//     if (x >= 6 && y >= 12 && z >= -16) {

//       if (move === 'all') {
//         setTimeout(() => {
//           move = 'second';
//         }, 1);

//       } else {
//         move = '';


//         p.focus();
//         goProjects.addEventListener('click', e => {
//           e.preventDefault();
//           p.focus();
//         })
//         setTimeout(() => {
//           writeSkills();

//         }, 1000)
//       }
//     }
//   }



//   if (move === 'second') {
//     camera.position.y < 12 ? camera.position.y += 0.25 : '';
//     camera.position.z > -8 ? camera.position.z -= 0.15 : '';
//     x < 16 ? x += 0.25 : '';
//     y > 10 ? y -= 0.05 : '';

//     if (window.matchMedia('(max-width: 900px)').matches) {
//       x2 < 16 ? x2 += 0.3 : '';
//       console.log(x2)
//       obj3D.position.set(x2, 8, -16)
//     }
//     if (x >= 16 && y <= 10) {

//       move = '';
//       if (window.matchMedia('(max-width: 650px)').matches) {
//         back.classList.add("backBottom");
//       }
//       contact.classList.add('contactTop');
//       projects.classList.remove('none');
//       back.classList.remove('none');
//       goProjects.classList.add('none')
//       setTimeout(() => {
//         projects.classList.add('projectsAppear')
//       }, 450)
//       setTimeout(() => {
//         back.style.cssText = 'translate: 0 0;'
//       }, 1000)
//     }
//   }



  camera.lookAt(x, y, z)
  composer.render(0.1);
}

animate();

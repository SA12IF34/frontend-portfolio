import * as THREE from 'three';
import { GodRaysEffect, RenderPass, EffectPass, EffectComposer } from 'postprocessing';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { randInt } from 'three/src/math/MathUtils';


let container = document.getElementById('app') as HTMLDivElement;
let projectsBtn = document.getElementById("projectsBtn") as HTMLButtonElement;
let skillsBtn = document.getElementById("skillsBtn") as HTMLButtonElement;
let goProjectsBtn = document.getElementById("goProjectsBtn");
let changeable = document.querySelector("div.changeable") as HTMLDivElement;
let skills = document.querySelector("main>div.skills") as HTMLDivElement;
let goProjects = document.querySelector('.goProjects') as HTMLDivElement;
let contact = document.getElementById("contact") as HTMLDivElement;
let projects = document.querySelector(".projects") as HTMLDivElement;
let back = document.querySelector(".back") as HTMLDivElement;


const pi = Math.PI;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 1000);


scene.add(camera)
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x000000, 0);
if (window.matchMedia('(min-width: 768px)').matches) {
  renderer.setPixelRatio(2);
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  renderer.setPixelRatio(window.devicePixelRatio);
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
obj3D.position.set(16, 8, -16);
obj3D.add(core)

const orbitControls = new OrbitControls(camera, renderer.domElement);

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
let colors = [0xfb4104, 0x1589fd, 0xf8d44c, 0xffbcbd, 0xfff654, 0xffa666]

for (let i = 0; i < 6; i++) {
  var g = new THREE.TorusGeometry(i + 3, 0.1, 50, 50, 4.5);
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

let move = '';
let x: number, y: number, z: number;
x = 3; y = 6; z = -18;
let skillsP = 'I have In my skills bag HTML, CSS, JavaScript, TypeScript, ReactJs, NextJs, Chakra-UI, and ThreeJs';
function animate() {
  requestAnimationFrame(animate)

  obj3D.rotation.y += 0.005;

  skillsBtn.addEventListener('click', (): void => {
    changeable.classList.add('transparent');


    setTimeout(() => {
      move = 'first';
      skills.classList.remove('transparent', 'none');
      changeable.classList.add('none')
    }, 800)

  });
  projectsBtn.addEventListener('click', (): void => {
    changeable.classList.add('transparent');

    setTimeout(() => {
      move = 'all';
      skills.classList.remove('transparent', 'none');
      changeable.classList.add('none')
    }, 800)

  });
  goProjectsBtn.addEventListener('click', (): void => {
    skills.classList.add('transparent');
    setTimeout(() => { move = 'second'; }, 800)
  })

  if (move === 'first' || move === 'all') {
    camera.position.x < 10 ? camera.position.x += 0.75 : '';
    camera.position.y < 1 ? camera.position.y += 0.075 : '';
    camera.position.z > -4 ? camera.position.z -= 0.3 : '';
    x < 6 ? x += 0.225 : '';
    y < 12 ? y += 0.45 : '';
    z < -16 ? z += 0.15 : '';

    if (x >= 6 && y >= 12 && z >= -16) {

      if (move === 'all') {
        setTimeout(() => {
          move = 'second';
        }, 1);

      } else {
        move = '';
        let i = 0;
        var p = skills.firstElementChild as HTMLInputElement;
        p.focus();
        goProjects.addEventListener('click', e => {
          e.preventDefault();
          p.focus();
        })
        setTimeout(() => {

          let intervalFunc = () => {
            if (i < skillsP.length) {

              p.value += skillsP[i];

              i += 1
            }
            if (i === 23) {

              clearInterval(interval);
              setTimeout(() => { setInterval(intervalFunc, 50) }, 500)

            }
            if (i === skillsP.length) {
              goProjectsBtn.classList.remove("none");
            }

          }
          let interval = setInterval(intervalFunc, 50)
        }, 1000)
      }
    }
  }
  // camera.position.set(10, 12, -8);
  if (move === 'second') {
    camera.position.y < 12 ? camera.position.y += 0.5 : '';
    camera.position.z > -8 ? camera.position.z -= 0.3 : '';
    x < 16 ? x += 0.5 : '';
    y > 10 ? y -= 0.1 : '';

    if (x >= 16 && y <= 10) {
      move = '';
      contact.classList.add('contactTop');
      projects.classList.remove('none');
      back.classList.remove('none');
      setTimeout(() => {
        projects.classList.add('projectsAppear')
      }, 450)
      setTimeout(() => {
        back.style.cssText = 'translate: 0 0;'
      }, 1000)
    }
  }
  camera.lookAt(x, y, z)
  composer.render(0.1);
}

animate();
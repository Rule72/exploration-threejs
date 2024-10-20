import * as THREE from 'three';
import { OBJLoader } from 'three-examples/OBJLoader.js';
import { FontLoader } from 'three-examples/FontLoader.js';
import { TextGeometry } from 'three-examples/TextGeometry.js';

let scene, camera, renderer, foot, text;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  loadModel();
  loadText();
  addLights();

  window.addEventListener('resize', onWindowResize, false);
}

function loadModel() {
  const loader = new OBJLoader();
  loader.load('/models/foot.obj', (object) => {
    foot = object;
    foot.position.set(0, -1, 0);
    foot.rotation.x = -Math.PI / 2;
    foot.scale.set(0.02, 0.02, 0.02);
    scene.add(foot);
  });
}

function loadText() {
  const fontLoader = new FontLoader();
  fontLoader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Jake Hopkins', {
      font: font,
      size: 0.5,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 5
    });
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.set(-1.5, 0, -2);
    scene.add(text);
  });
}

function addLights() {
  const lights = [
    { color: 0x00FFFF, intensity: 0.8, position: { x: 2, y: 3, z: 4 } },
    { color: 0xFF00FF, intensity: 0.5, position: { x: -2, y: 2, z: -3 } },
    { color: 0xFFFF00, intensity: 0.4, position: { x: 0, y: -3, z: 0 } },
    { color: 0x39FF14, intensity: 1.2, position: { x: -3, y: 0, z: 3 } },
    { color: 0xFF6600, intensity: 1.2, position: { x: 3, y: 0, z: -3 } }
  ];

  lights.forEach(light => {
    const pointLight = new THREE.PointLight(light.color, light.intensity);
    pointLight.position.set(light.position.x, light.position.y, light.position.z);
    scene.add(pointLight);
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  if (foot) foot.rotation.y += 0.01;
  if (text) text.rotation.y += 0.01;
  renderer.render(scene, camera);
}

init();
animate();

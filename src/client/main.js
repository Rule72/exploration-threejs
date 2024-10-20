import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

let scene, camera, renderer;
let sceneObjects = [];

async function init() {
  // Create scene
  scene = new THREE.Scene();
  
  // Create camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Load scene data
  await loadSceneData();

  // Handle window resize
  window.addEventListener('resize', onWindowResize, false);

  // Start animation loop
  animate();
}

async function loadSceneData() {
  try {
    const response = await fetch('/api/scene'); // Adjust this URL as needed
    const sceneData = await response.json();

    // Set camera position
    camera.position.set(
      sceneData.camera.position.x,
      sceneData.camera.position.y,
      sceneData.camera.position.z
    );

    // Load objects
    for (const obj of sceneData.objects) {
      if (obj.type === 'model') {
        await loadModel(obj);
      } else if (obj.type === 'text') {
        await loadText(obj);
      }
    }

    // Add lights
    for (const light of sceneData.lights) {
      const pointLight = new THREE.PointLight(light.color, light.intensity);
      pointLight.position.set(light.position.x, light.position.y, light.position.z);
      scene.add(pointLight);
    }
  } catch (error) {
    console.error('Error loading scene data:', error);
  }
}

async function loadModel(modelData) {
  const loader = new OBJLoader();
  try {
    const object = await loader.loadAsync(modelData.path);
    object.position.set(modelData.position.x, modelData.position.y, modelData.position.z);
    object.rotation.set(modelData.rotation.x, modelData.rotation.y, modelData.rotation.z);
    object.scale.set(modelData.scale.x, modelData.scale.y, modelData.scale.z);
    scene.add(object);
    sceneObjects.push(object);
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

async function loadText(textData) {
  const loader = new FontLoader();
  try {
    const font = await loader.loadAsync('/fonts/helvetiker_regular.typeface.json'); // Adjust path as needed
    const geometry = new TextGeometry(textData.text, {
      font: font,
      size: textData.size,
      height: textData.height,
      curveSegments: textData.curveSegments,
      bevelEnabled: textData.bevelEnabled,
      bevelThickness: textData.bevelThickness,
      bevelSize: textData.bevelSize,
      bevelSegments: textData.bevelSegments
    });
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.set(textData.position.x, textData.position.y, textData.position.z);
    textMesh.rotation.set(textData.rotation.x, textData.rotation.y, textData.rotation.z);
    scene.add(textMesh);
    sceneObjects.push(textMesh);
  } catch (error) {
    console.error('Error loading text:', error);
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  
  // Rotate all objects in the scene
  sceneObjects.forEach(obj => {
    obj.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}

// Initialize the scene
init();

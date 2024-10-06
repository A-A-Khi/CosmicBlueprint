import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { FontLoader } from 'jsm/loaders/FontLoader.js';
import { TextGeometry } from 'jsm/geometries/TextGeometry.js';
import getStarfield from "./src/getStarfield.js";

// Scene and Camera setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);  // Adjust camera position to center and cover both globes
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);  // Full screen
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Orbit Controls for zooming, but not rotating the globes automatically
const orbitCtrl = new OrbitControls(camera, renderer.domElement);
orbitCtrl.enableZoom = true;  // Enable zooming in and out
orbitCtrl.enablePan = false;  // Disable panning to maintain camera position
orbitCtrl.enableRotate = false;  // Disable automatic rotation control

// Raycaster for detecting mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let clickableObjects = [];  // Store clickable objects like the spaceship

// Track whether a globe is being dragged
let isDragging = false;
let selectedGlobe = null;
let previousMousePosition = { x: 0, y: 0 };

// Auto-rotation speeds (slow rotation)
const autoRotateSpeed = 0.0005;  // Slow auto-rotation speed
let isInteracting = false;  // To determine when the user is interacting

// Texture loading
const textureLoader = new THREE.TextureLoader();
const texture2222 = textureLoader.load("./src/2222.jpg");  // Apply 2222.jpg to the first globe
const texture2100 = textureLoader.load("./src/2100.jpg");  // Apply 2100.jpg to the second globe

// Satellite textures (metallic body and solar panel)
const metalTexture = textureLoader.load("./src/metal.jpg");  // Metallic texture for satellite body
const solarTexture = textureLoader.load("./src/solar-panel.jpg");  // Solar panel texture

// Asteroid texture (rocky surface)
const asteroidTexture = textureLoader.load("./src/rock.jpg");  // Rock texture for asteroid

// === Globe 1 (Apply 2222.jpg) ===
const globeGroup1 = new THREE.Group();
globeGroup1.position.set(-2, 0, 0);  // Shift first globe to the left
scene.add(globeGroup1);

const globeGeo1 = new THREE.SphereGeometry(1, 32, 32);
const globeMat1 = new THREE.MeshBasicMaterial({
  map: texture2222  // Apply only the 2222.jpg texture to the first globe
});
const globeMesh1 = new THREE.Mesh(globeGeo1, globeMat1);
globeGroup1.add(globeMesh1);

// === Globe 2 (with 2100.jpg) ===
const globeGroup2 = new THREE.Group();
globeGroup2.position.set(2, 0, 0);  // Shift second globe to the right
scene.add(globeGroup2);

const globeGeo2 = new THREE.SphereGeometry(1, 32, 32);
const globeMat2 = new THREE.MeshBasicMaterial({
  map: texture2100  // Apply only the 2100.jpg texture to this globe
});
const globeMesh2 = new THREE.Mesh(globeGeo2, globeMat2);
globeGroup2.add(globeMesh2);

// === Asteroid above Globe 2 ===
const asteroidGeo = new THREE.SphereGeometry(0.21, 16, 16);  // Reduced size by 30%
const asteroidMat = new THREE.MeshPhongMaterial({
  map: asteroidTexture,  // Apply rocky texture for asteroid
  bumpScale: 0.05,
  emissive: new THREE.Color(0x444444),  // Add a slight glow to make it more visible
  emissiveIntensity: 0.6  // Adjust intensity
});
const asteroidMesh = new THREE.Mesh(asteroidGeo, asteroidMat);
asteroidMesh.position.set(2, 1.5, 0);  // Position above Globe 2
scene.add(asteroidMesh);

// === Text label "2100" on the front of the asteroid (White Color) ===
const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeo = new TextGeometry('2024', {
    font: font,
    size: 0.1,  // Make the text smaller
    height: 0.02,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.008,
    bevelSegments: 5
  });

  const textMat = new THREE.MeshBasicMaterial({ color: 0xffffff });  // White text color for "2100"
  const textMesh = new THREE.Mesh(textGeo, textMat);

  textMesh.position.set(2, 1.5, 0.22);  // Place it slightly forward on the front of the asteroid
  scene.add(textMesh);
});

// === Satellite above Globe 1 ===
const satelliteGroup = new THREE.Group();

// Satellite body with metal texture and a brighter emissive glow
const bodyGeo = new THREE.BoxGeometry(0.2, 0.2, 0.4);  // Satellite body
const bodyMat = new THREE.MeshPhongMaterial({
  map: metalTexture,
  emissive: new THREE.Color(0x666666),  // Add a slight emissive glow to the satellite body
  emissiveIntensity: 0.5  // Medium intensity
});
const satelliteBody = new THREE.Mesh(bodyGeo, bodyMat);
satelliteBody.position.set(0, 0, 0);

// Solar panels with bright solar panel texture
const panelGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 32);
const panelMat = new THREE.MeshPhongMaterial({
  map: solarTexture,
  emissive: new THREE.Color(0x1111ff),  // Slight blue emissive to give solar panel a glowing look
  emissiveIntensity: 0.7  // Increase the intensity
});
const leftPanel = new THREE.Mesh(panelGeo, panelMat);
const rightPanel = new THREE.Mesh(panelGeo, panelMat);

leftPanel.rotation.z = Math.PI / 2;
rightPanel.rotation.z = Math.PI / 2;
leftPanel.position.set(-0.3, 0, 0);
rightPanel.position.set(0.3, 0, 0);

// Add the parts to satellite group
satelliteGroup.add(satelliteBody);
satelliteGroup.add(leftPanel);
satelliteGroup.add(rightPanel);

// Position satellite above Globe 1
satelliteGroup.position.set(-2, 1.5, 0);  // Position above Globe 1
scene.add(satelliteGroup);

// === Text label "2024" on the satellite (White Color) ===
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeo = new TextGeometry('2100', {
    font: font,
    size: 0.1,  // Make the text smaller
    height: 0.02,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.008,
    bevelSegments: 5
  });

  const textMat = new THREE.MeshBasicMaterial({ color: 0xffffff });  // White text color for "2024"
  const textMesh = new THREE.Mesh(textGeo, textMat);

  textMesh.position.set(-2, 1.5, 0.25);  // Place it slightly forward on the satellite
  scene.add(textMesh);
});

// === Spaceship in the Lower Center ===
// Create the spaceship body using a cylinder and cone, with a metallic silver color
const spaceshipBodyGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32);
const spaceshipBodyMat = new THREE.MeshPhongMaterial({ color: 0xc0c0c0, emissive: 0x888888, emissiveIntensity: 0.7 });  // Silver color with slight glow
const spaceshipBody = new THREE.Mesh(spaceshipBodyGeo, spaceshipBodyMat);

// Add a cone on top for the spaceship head, with a silver color
const spaceshipHeadGeo = new THREE.ConeGeometry(0.1, 0.2, 32);
const spaceshipHeadMat = new THREE.MeshPhongMaterial({ color: 0xc0c0c0, emissive: 0xaaaaaa, emissiveIntensity: 0.8 });
const spaceshipHead = new THREE.Mesh(spaceshipHeadGeo, spaceshipHeadMat);
spaceshipHead.position.set(0, 0.35, 0);  // Position it on top of the body

// Create the spaceship group
const spaceshipGroup = new THREE.Group();
spaceshipGroup.add(spaceshipBody);
spaceshipGroup.add(spaceshipHead);
spaceshipGroup.position.set(0, 1, 0);  // Lower the spaceship to make it visible when the page loads
scene.add(spaceshipGroup);

// === Text label "Guys hop on" on the spaceship (Red Color) ===
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeo = new TextGeometry('Guys hop on', {
    font: font,
    size: 0.09,  // Smaller text
    height: 0.01,
    curveSegments: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 5
  });

  const textMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });  // Red text for "Guys hop on"
  const textMesh = new THREE.Mesh(textGeo, textMat);

  textMesh.position.set(0, -0.2, 0.25);  // Position on the spaceship, slightly in front
  spaceshipGroup.add(textMesh);  // Add the text to the spaceship group
});

// Make the spaceship clickable
clickableObjects.push(spaceshipGroup);

// Event listeners for mouse actions
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mouseup', onMouseUp, false);

// Handle mouse clicks
function onMouseDown(event) {
  event.preventDefault();
  const intersects = getIntersectedObjects(event);

  if (intersects.length > 0) {
    selectedGlobe = intersects[0].object.parent;  // Assign the globe group being clicked
    isDragging = true;  // Mark dragging as true
    isInteracting = true;  // Mark that user interaction is happening
    previousMousePosition = { x: event.clientX, y: event.clientY };  // Track initial position

    // Check if spaceship is clicked
    if (intersects[0].object.parent === spaceshipGroup) {
      window.location.href = 'newpage.html';  // Redirect to the new page
    }
  }
}

// Handle mouse movement
function onMouseMove(event) {
  if (isDragging && selectedGlobe) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    };

    // Update the rotation of the selected globe based on mouse movement
    const rotationSpeed = 0.005;
    selectedGlobe.rotation.y += deltaMove.x * rotationSpeed;  // Rotate horizontally
    selectedGlobe.rotation.x += deltaMove.y * rotationSpeed;  // Rotate vertically

    previousMousePosition = { x: event.clientX, y: event.clientY };  // Update previous position
  }
}

// Handle mouse up event
function onMouseUp() {
  isDragging = false;  // Stop dragging
  selectedGlobe = null;  // Deselect the globe
  isInteracting = false;  // Reset interaction status
}

function getIntersectedObjects(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([globeMesh1, globeMesh2, spaceshipGroup], true);
  return intersects;
}

// Animation loop - add auto-rotation when no interaction
function animate() {
  if (!isInteracting) {
    // Apply slow auto-rotation when no user interaction
    globeGroup1.rotation.y += autoRotateSpeed;
    globeGroup2.rotation.y += autoRotateSpeed;
    asteroidMesh.rotation.y += autoRotateSpeed * 5;  // Asteroid rotates slightly faster
    satelliteGroup.rotation.y += autoRotateSpeed * 5;  // Satellite also rotates slightly faster
    spaceshipGroup.rotation.y += autoRotateSpeed * 2;  // Spaceship rotates slowly
  }

  // Render the scene
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Resize handling
window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'

const gui = new dat.GUI()

// Canvas
const canvas = document.getElementById('webgl');

// Scene
const scene = new THREE.Scene();
const backgroundColor = {color: 0x161616};
scene.background = new THREE.Color(0x161616);

gui.addColor(backgroundColor, 'color')
  .onChange((c) => scene.background.set( c));

const loader = new GLTFLoader();
loader.load('models/winter-house.glb', (wh) => {
    const pl = new THREE.PointLight('#ff7d46', 5, 4.5)
    gui.add(pl.position, 'x').min(-20).max(20).step(0.001)
    gui.add(pl.position, 'y').min(-20).max(20).step(0.001)
    gui.add(pl.position, 'z').min(-20).max(20).step(0.001)
    pl.position.set(-1, 2, -2.3)
    scene.add(pl)
    wh.scene.scale.setX(0.75)
    wh.scene.scale.setZ(0.75)
    return scene.add(wh.scene);
  },
  undefined,
  console.log,
);

loader.load('models/scene.gltf',
  gltf => {

    for (let i = 0; i < 30; i++) {
      const angles = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 4.2;
      const x = Math.sin(angles) * radius
      const z = Math.cos(angles) * radius

      const clone = gltf.scene.clone();
      clone.position.setX(x)
      clone.position.setZ(z)

      clone.scale.setY(Math.random() + 1.2)
      scene.add(clone)
    }


  },
  undefined,
  error => console.error(error),
);


const snowGeometry = new THREE.BufferGeometry();
const count = 1000;
const positionArray = new Float32Array(count * 3);

for (let i = 0; i < positionArray.length; i++) {
  positionArray[i] = 13.5 * Math.sin(Math.random() - 0.5);
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
snowGeometry.setAttribute('position', positionAttribute);

const textureLoader = new THREE.TextureLoader();
const sprite1 = textureLoader.load('textures/snowflake2.png');
const particleMaterial = new THREE.PointsMaterial({
  size: 0.15,
  color: 0xffffff,
  map: sprite1,
  vertexColors: false,
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 0.4,
  fog: true,
  depthWrite: false
})

const snowGroundColorTexture = textureLoader.load('/textures/snow-ground/color.jpeg');
const snowGroundAmbientOcclusionTexture = textureLoader.load('/textures/snow-ground/ambientOcclusion.jpeg');
const snowGroundHeightTexture = textureLoader.load('/textures/snow-ground/height.jpeg');
const snowGroundNormalTexture = textureLoader.load('/textures/snow-ground/normal.jpeg');
const snowGroundMetalnessTexture = textureLoader.load('/textures/snow-ground/metalness.jpeg');
const snowGroundRoughnessTexture = textureLoader.load('/textures/snow-ground/roughness.jpeg');

const radius = 7.5;
const radialSegments = 240;
const snowGroundMaterial = new THREE.MeshStandardMaterial({
  transparent: true,
  map: snowGroundColorTexture,
  aoMap: snowGroundAmbientOcclusionTexture,
  displacementMap: snowGroundHeightTexture,
  displacementScale: 0.01,
  normalMap: snowGroundNormalTexture,
  metalnessMap: snowGroundMetalnessTexture,
  roughnessMap: snowGroundRoughnessTexture,
});


const hemiSphereGeom = new THREE.SphereBufferGeometry(radius, radialSegments, Math.round(radialSegments / 4), 0, Math.PI * 2, 0, Math.PI * 0.5);
hemiSphereGeom.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(hemiSphereGeom.attributes.uv.array, 2)
);
const hemiSphere = new THREE.Mesh(hemiSphereGeom, snowGroundMaterial);


const snowPlaneColorTexture = textureLoader.load('/textures/snow/color.jpg');
const snowPlaneAmbientOcclusionTexture = textureLoader.load('/textures/snow/occlusion.jpg');
const snowPlaneNormalTexture = textureLoader.load('/textures/snow/normal.jpg');
const snowPlaneRoughnessTexture = textureLoader.load('/textures/snow/roughness.jpg');

const capGeom = new THREE.CircleBufferGeometry(radius, radialSegments);
capGeom.computeVertexNormals()
const snowMaterial = new THREE.MeshStandardMaterial({
  transparent: true,
  map: snowGroundColorTexture,
  aoMap: snowGroundAmbientOcclusionTexture,
  displacementScale: 0.9,
  normalMap: snowGroundNormalTexture,
  roughnessMap: snowGroundRoughnessTexture,
});

snowPlaneColorTexture.repeat.set(16, 16);
snowPlaneAmbientOcclusionTexture.repeat.set(16, 16);
snowPlaneNormalTexture.repeat.set(16, 16);
snowPlaneRoughnessTexture.repeat.set(16, 16);

snowPlaneColorTexture.wrapS = THREE.RepeatWrapping;
snowPlaneAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
snowPlaneNormalTexture.wrapS = THREE.RepeatWrapping;
snowPlaneRoughnessTexture.wrapS = THREE.RepeatWrapping;

snowPlaneColorTexture.wrapT = THREE.RepeatWrapping;
snowPlaneAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
snowPlaneNormalTexture.wrapT = THREE.RepeatWrapping;
snowPlaneRoughnessTexture.wrapT = THREE.RepeatWrapping;

capGeom.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(capGeom.attributes.uv.array, 2)
);
const cap = new THREE.Mesh(capGeom, snowMaterial);
cap.rotateX(Math.PI * 0.5)

hemiSphere.rotateX(Math.PI);
hemiSphere.add(cap);
scene.add(hemiSphere);

const particleMesh = new THREE.Points(
  snowGeometry,
  particleMaterial,
);

const velocities = [];
for (let i = 0; i < count; i++) {
  const x = Math.floor(Math.random() * 6 - 3) * 0.1;
  const y = Math.floor(Math.random() * 10 + 3) * -0.05;
  const z = Math.floor(Math.random() * 6 - 3) * 0.1;
  const particle = new THREE.Vector3(x, y, z);
  velocities.push(particle);
}
particleMesh.geometry.velocities = velocities;
scene.add(particleMesh);


// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.52)
scene.add(ambientLight);

// Directional light
const pointLight = new THREE.PointLight(0x4287f5, 0.5);
scene.add(pointLight);
pointLight.position.set(0, 5, -6);


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.2, 2, -20);

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  let speed = 0.015;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3; // X Y Z
    snowGeometry.attributes.position.array[i3 + 1] -= speed; // Y
    if(snowGeometry.attributes.position.array[i3 + 1] <= -4) {
      snowGeometry.attributes.position.array[i3 + 1] = Math.random() * 10;
    }

  }

  snowGeometry.attributes.position.needsUpdate = true

  // Update controls
  controls.maxPolarAngle = (Math.PI / 2) - 0.05;
  controls.update()
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

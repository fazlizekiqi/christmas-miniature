import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.getElementById('webgl');

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

export const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.52)
export const pointLight = new THREE.PointLight(0x4287f5, 0.5);
pointLight.position.set(0, 5, -6);

export const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.2, 2, -20)

export const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

export const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

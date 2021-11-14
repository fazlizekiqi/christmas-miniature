import './style.css'
import * as THREE from 'three'
import Trees from "./objects/christmas-miniatur/Trees";
import WinterHouse from "./objects/christmas-miniatur/WinterHouse";
import SnowFlakes from "./objects/christmas-miniatur/SnowFlakes";
import SnowGround from "./objects/christmas-miniatur/SnowGround";
import { ambientLight, camera, controls, pointLight, renderer, sizes } from "./utils";
import Resources from "./Resources";

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x161616);
scene.add(ambientLight);
scene.add(pointLight);
scene.add(camera)

const resources = new Resources();
// Update area
resources.on('progress', (_progress) => {
  console.log("Progress: " + _progress)
})

let snowFlakes;

// Ready
resources.on('ready', () => {
  window.requestAnimationFrame(() => {
    snowFlakes = new SnowFlakes(scene, resources.items)
    const snowGround = new SnowGround(scene, resources.items);
    const trees = new Trees(scene, resources.items.treeModel, 30);
    const winterHouse = new WinterHouse(scene, resources.items.winterHouse);

  })
})

const render = () => {

  if(snowFlakes) {
    snowFlakes.update();
  }

  controls.maxPolarAngle = (Math.PI / 2) - 0.05;
  controls.update()
  renderer.render(scene, camera)

  window.requestAnimationFrame(render)

}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

render()

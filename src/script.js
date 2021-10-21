import './style.css'
import * as THREE from 'three'
import { Trees } from "./objects/Trees";
import { WinterHouse } from "./objects/WinterHouse";
import { SnowFlakes } from "./objects/SnowFlakes";
import { SnowGround } from "./objects/SnowGround";
import { ambientLight, pointLight, camera, sizes, renderer, controls } from "./utils";

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x161616);

scene.add(ambientLight);
scene.add(pointLight);
scene.add(camera)

WinterHouse(scene);
Trees(scene);
SnowGround(scene);
const snowFlakes = SnowFlakes(scene)

const render = () => {

  snowFlakes.updateSnowFlakes();
  snowFlakes.snowFlakeGeometry.attributes.position.needsUpdate = true

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

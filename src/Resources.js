import hemiSphereColorTexture from '../static/textures/snow-ground/color.jpeg'
import hemiSphereAmbientOcclusionTexture from '../static/textures/snow-ground/ambientOcclusion.jpeg'
import hemiSphereHeightTexture from '../static/textures/snow-ground/height.jpeg';
import hemiSphereNormalTexture from '../static/textures/snow-ground/normal.jpeg';
import hemiSphereMetalnessTexture from '../static/textures/snow-ground/metalness.jpeg';
import hemiSphereRoughnessTexture from '../static/textures/snow-ground/roughness.jpeg';
import snowflakeTexture from '../static/textures/snowflake2.png'
import treeModel from '../static/models/christmas-tree.glb';
import winterHouse from '../static/models/winter-house.glb';
import EventEmitter from './utils/EventEmitter.js'
import Loader from './utils/Loader.js'
import * as THREE from "three";

export default class Resources extends EventEmitter {
  constructor() {
    super()

    this.loader = new Loader()
    this.items = {}

    this.loader.load([
      {name: 'hemisphereColor', source: hemiSphereColorTexture, type: 'texture'},
      {name: 'hemisphereAmbientOcclusion', source: hemiSphereAmbientOcclusionTexture, type: 'texture'},
      {name: 'hemiSphereHeight', source: hemiSphereHeightTexture, type: 'texture'},
      {name: 'hemiSphereNormal', source: hemiSphereNormalTexture, type: 'texture'},
      {name: 'hemiSphereMetalness', source: hemiSphereMetalnessTexture, type: 'texture'},
      {name: 'hemiSphereRoughness', source: hemiSphereRoughnessTexture, type: 'texture'},
      {name: 'snowFlake', source: snowflakeTexture, type: 'texture'},
      {name: 'treeModel', source: treeModel},
      {name: 'winterHouse', source: winterHouse},

    ])

    this.loader.on('fileEnd', (_resource, _data) => {
      this.items[_resource.name] = _data

      // Texture
      if(_resource.type === 'texture') {
        const texture = new THREE.Texture(_data)
        texture.needsUpdate = true

        this.items[`${_resource.name}Texture`] = texture
      }

      // Trigger progress
      this.trigger('progress', [this.loader.loaded / this.loader.toLoad])
    })

    this.loader.on('end', () => {
      // Trigger ready
      this.trigger('ready')
    })
  }
}

'use strict'
// 目标：了解three.js最基本的内容


import * as THREE from 'three'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

// 设置相机位置
camera.position.set(0, 0, 10)

// 将相机加入场景中
scene.add(camera)


// 创建几何体
const cubeGeometry = new THREE.BoxGeometry()
// 创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 将物体添加到场景中
scene.add(cube)


// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)


// 使用渲染器通过相机将场景渲染进来
renderer.render(scene, camera)
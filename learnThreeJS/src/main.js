'use strict'
// 目标：使用控制器查看3d物体

import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, MeshBasicMaterial} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


// 创建场景
const scene = new Scene()

// 创建相机
const camera = new PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);
// 将相机加入场景中
scene.add(camera)
// 设置相机位置
camera.position.set(0, 0, 10)


// 创建几何体模型
const cubeGeometry = new BoxGeometry(1,1,1)
// 创建材质
const cubeMaterial = new MeshBasicMaterial({color: 0x00ff00})
// 根据几何体和材质创建物体
const cube = new Mesh(cubeGeometry, cubeMaterial)
// 将物体加入场景中
scene.add(cube)


// 初始化渲染器
const rendere = new WebGLRenderer()
// 设置渲染器大小
rendere.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas添加到body
document.body.appendChild(rendere.domElement)
// 使用渲染器通过相机将场景渲染出来
rendere.render(scene, camera)
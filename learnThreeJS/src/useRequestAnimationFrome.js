'use strict'
// 目标：认识requestAnimationFrame

import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, MeshBasicMaterial, AxesHelper} from 'three'
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
console.log(cube)
// 将物体加入场景中
scene.add(cube)
// 物体缩放
// cube.scale.set(3, 2, 1)
// cube.scale.x = 5
// 物体旋转
// cube.rotation.set(Math.PI / 4, 0, 0)

// 初始化渲染器
const rendere = new WebGLRenderer({
  antialias: true
})
// 设置渲染器大小
rendere.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas添加到body
document.body.appendChild(rendere.domElement)
// 使用渲染器通过相机将场景渲染出来
// rendere.render(scene, camera)


// 创建轨道渲染器
const controls = new OrbitControls(camera, rendere.domElement)


// 添加坐标轴辅助器
const axesHelper = new AxesHelper(5)
scene.add(axesHelper)

function render(time){
  rendere.render(scene, camera)
  // 渲染下一帧的时候就会调用render函数
  // 更改物体位置
  // cube.position.x += 0.01
  // cube.rotation.x += 0.01
  // if(cube.position.x > 5) cube.position.x = 0;

  let t = time / 1000 % 5;
  cube.position.x = t * 1
  // if(cube.position.x > 5) cube.position.x = 0;
  requestAnimationFrame(render)
  // requestAnimationFrame会对回调函数传入参数`time`，类型为：时间戳
  // console.log(time)
};

render()
'use strict'
// 目标：渲染画布自适应

import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, MeshBasicMaterial, AxesHelper, Clock} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from 'gsap'

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
const renderer = new WebGLRenderer({
  antialias: true
})
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas添加到body
document.body.appendChild(renderer.domElement)
// 使用渲染器通过相机将场景渲染出来
// renderer.renderer(scene, camera)


// 创建轨道渲染器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼，让控制器更有真实效果，动画循环必须.update()
controls.enableDamping = true


// 添加坐标轴辅助器
const axesHelper = new AxesHelper(5)
scene.add(axesHelper)


// 设置动画
const animate1 = gsap.to(cube.position, {x: 5,
  duration: 5,
  ease: "elastic.out",
  onComplete: ()=> console.log('动画完成'),
  onStart: ()=> console.log('动画开始'),
  // 动画重复次数，无线循环 -1\
  // repeat: -1,
  // 往返运动
  // yoyo: true,
  // 设置延迟
  delay: 2
})


// 动画控制
window.addEventListener('dblclick', ()=>{
  if(animate1.isActive()) animate1.pause()
  else animate1.resume();
})
gsap.to(cube.rotation, {x: (2 * Math.PI), duration: 5, ease: "power1.inOut"})

// 设置时钟
const clock = new Clock();
function render(time){
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
  // requestAnimationFrame会对回调函数传入参数`time`，类型为：时间戳
  // console.log(time)
};

render()


// 监听窗口变化，更新画布大小
window.addEventListener('resize', ()=> {
  // 更新摄像机长宽比
  camera.aspect = (window.innerWidth/window.innerHeight);
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})
'use strict'
// 目标：打造炫酷三角形

import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, AxesHelper, Clock} from 'three'
// import about light
import { 
  AmbientLight,
  DirectionalLight
 } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


// 导入动画库
import gsap from 'gsap'
// 导入dat.gui
import { GUI } from 'dat.gui'
// const gui = new GUI()

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



const cubeGeometry = new BoxGeometry(1,1,1)
const materail = new MeshStandardMaterial({
  color: '#ffff00'
})
const cube = new Mesh(cubeGeometry, materail)

scene.add(cube)


// 灯光
// 环境光
// const light = new AmbientLight(0x404040, 6)
// scene.add(light)
// 直线光源
const directionalLight = new DirectionalLight(0x404040, 0.5)
directionalLight.position.set(10,10,10)
scene.add(directionalLight)


// 改变x轴的位置
// gui.add(cube.position, 'x').min(0).max(5).step(0.01).name('moveX').onChange(value=>{
//   console.log(`change value for X: ${value}`)
// }).onFinishChange(value =>{
//   console.log(`完全停止了`)
// })
// // 修改物体的颜色
// const params = {
//   color: '#ffff00',
//   fn(){
//     // 让立方体运动起来
//     gsap.to(cube.position, {x: 5, duration: 2, yoyo:true,repeat: -1})
//   }
// }
// 设置颜色
// gui.addColor(params, 'color').onChange(value =>{
//   // console.log(`color change: ${value}`)
//   cube.material.color.set(value)
// })
// // 设置选项框
// gui.add(cube, 'visible').name('是否显示')
// // 添加文件夹
// const folder = gui.addFolder('设置立方体')
// folder.add(cube.material, 'wireframe')
// // 设置按钮点击触发某个事件
// folder.add(params, 'fn').name('start animate')


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
// const animate1 = gsap.to(cube.position, {x: 5,
//   duration: 5,
//   ease: "elastic.out",
//   onComplete: ()=> console.log('动画完成'),
//   onStart: ()=> console.log('动画开始'),
//   // 动画重复次数，无线循环 -1\
//   // repeat: -1,
//   // 往返运动
//   // yoyo: true,
//   // 设置延迟
//   delay: 2
// })


// 动画控制
window.addEventListener('dblclick', ()=>{
  // 双击控制屏幕进入全面或退出全屏

  const fullScreenElement = document.fullscreenElement;
  if(fullScreenElement) document.exitFullscreen()
  else renderer.domElement.requestFullscreen();
})
// gsap.to(cube.rotation, {x: (2 * Math.PI), duration: 5, ease: "power1.inOut"})

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
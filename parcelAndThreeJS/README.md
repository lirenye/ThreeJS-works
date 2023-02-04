# 使用parcel打包工具构建three.js开发环境

## 初始化项目 安装相关依赖包
 - 初始化项目
 ```
 npm init -y
 ```
 - 安装parcel和three.js包
 ```
 // parcel为开发依赖
 npm install -D parcel-bundler

 // three.js为运行依赖
 npm install three
 ```

## 在`package.json`中定义`parcel`命令
```json
{
  "script":{
    "dev": "parcel <your entry file>",
    "build": "parcel build <your entry file>"
  }
}

example
// 指定`.html`文件为入口文件
{
  "dev": "parcel index.html",
  "build": "parcel build index.html"
}
```

## 定义`main.js`文件并在`.html`中以模块的方式引入

```html
<!-- index.html -->
<body>
  <script src="main.js" type="module"></script>
</body>
```

## `main.js`中以模块的方式引入`three.js`，开始您的创意
```javascript
import * as THREE from 'three'
```
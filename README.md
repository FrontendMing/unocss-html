# Unocss HTML


## 目标
- 使用 unocss 写出响应式的 html 页面，提高页面输出效率
- 页面写完后，用打包命令打包，得到打包后的 js、css 等文件  
- 支持多页面入口，一并打包，打包后得到各个页面的 html、js、css 文件
- 静态资源文件，放在 public 文件夹下即可


## 收益
- 1、用工程化的方式写页面，修改样式等实时更新
- 2、引入 unocss，完全告别手写css
- 3、按需打包。打包时只会打包项目中用到的 class 类，精简css大小


## 项目结构说明
```
├── public                     # 项目公共静态资源目录
├── ├── common.css             # 页面 css（公共）
├── ├── normalize.css          # 页面重置 css（公共）
│   └── img                    # 静态图片目录
├── page                       # 多页面
│   ├── test                   # test 页面
│   │   ├── index.css
│   │   ├── index.html
│   │   └── index.js
│   └── ...                    # 更多页面
│
├── index.html                 # 项目页面入口，仅作示例页面跳转用
├── package.json               # 项目包管理说明
├── uno.config.js              # unocss 配置
└── vite.config.js             # 项目打包配置
```

<font color="#FFFF00" size="5">注意事项</font>

- 需要在页面引入公共样式，因为这样就可以保证，公共样式不会被重复打包进自定义页面的css文件中
```
<link rel="stylesheet" href="/normalize.css">
<link rel="stylesheet" href="/common.css">
<script type="module">import 'virtual:uno.css';</script>

<!-- 如果页面有需要合并的样式，建议新建私有css文件，再在页面引入 -->
<!-- <link rel="stylesheet" href="./index.css"> -->
```
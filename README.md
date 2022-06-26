# 项目搭建流程

## 搭建Vue项目

#### Vue工具安装
> vue脚手架工具(vue命令行工具)
> vue command line tool，简单的来讲，就是一个基于命令行的vue开发工具。
> [注：**Vue-CLI ≠ Vue**，Vue-CLI就是一个Vue工具,重点在于指令，安装了就可以使用指令创建项目。]



## myadmin【后台管理项目】
### vue创建项目
1. vue create [项目名称]<br>
   vue create myadmin
2. Please pick a preset: (Use arrow keys)<br>
    Manually select features  【上下方向键选中手动配置然后回车】
3. Check the features needed for your project:
   【空格进行选择和不选择】选择Babel、Router、Vuex、CSS Pre-processors<br>
4. Choose a version of Vue.js that you want to start the project with (Use arrow keys)<br>  选择2.x
5. Use history mode for router? (Requires proper server setup for index fallback in production)<br>
   输入n ==> no
6. Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow keys)<br>
    选择Less即可
7. Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)<br>
   In package.json
8. Save this as a preset for future projects?<br>
   输入n ==> no

### 项目初始配置
1. 忽略node_modules文件夹<br>
   【vscode一般右下方会有提示窗口是否要忽略node_modules文件夹】<br>
   Git 存储库“d:\.Study2022\三阶段\code\day8\myadmin”中存在大量活动更改，将仅启用部分 Git 功能。 是否要将“node_modules”添加到 .gitignore?
   选择是<br>
    如果没有就到.gitignore最上面添加`node_modules`

2. cd 进入项目根目录[按tab键会提示你当前目录下的文件，可以切换]

3. 开发阶段关闭eslint
   - 在项目根目录创建vue.config.js 文件，配置如下：
     ```
     module.exports = {
         lintOnSave: false// eslint-loader 是否在保存的时候检查
     }
     ```
4. 运许项目
   - 运行`npm run serve`命令来启动项目
   - > 注意：默认端口号会从8080开始，如果再次启动其他项目后续会以8081、8082……进行监听。
   - > 如果需要停止正在运行的项目，可以选择以下两种方式任一：
     - 关闭终端
     - 在终端中按下组合键`Ctrl + C`（Cancel），随后选择`Y`并键入`回车`
     - 也可以按下两次`Ctrl + C`
   - ==关于项目运行时，如果修改了项目代码是否需要重启的说明：==
     - 是否需要重启取决于我们修改了什么内容，如果只是修改了代码部分（js、css、vue文件等）是不需要开发者手动重启项目的，系统会自动重新编译（有点nodemon感觉）；**但是如果修改的是配置文件，则必须需要自己先去停止项目，然后再去启动项目（手动实现重启）。**
5. 清除文件【初次做项目，删除了很多不必要的文件，熟悉这些不同文件夹、文件的用途】
   + 分别删除src目录下的assets文件夹、components文件夹、router文件夹、store文件夹和views文件夹
   + 清除一下App.vue里面内容【App.vue，只保留一个容器，它不需要script，里面不写js,main.js可以说就是App.vue里的js分离出去的】
        ```
        <template>
            <!-- 容器，展示内容用 -->
            <router-view></router-view>
        </template>

        <style lang="less">

        </style>
        ```
   + 根组件去掉scoped 【scoped：把当前组件的样式变成局部样式】

6. 搭建项目目录结构，在src目录下创建文件夹
   + api文件夹 统一api控制
   + assets文件夹 存放静态资源
   + components文件夹 公共组件
   + layout文件夹 布局+导航栏子组件【固定不变的内容作为子组件也一起放在这里，注意一点，子组件不和路径url，相关联,只做展示用，路由父组件得注册路由，总路由【路由实例】是挂载在根组件上的】
     + 主要放Layout.vue路由组件
   + mock文件夹 mock接口
   + router文件夹 路由，主要做跳转配置文件
     + 在里面可以提前新建一个index.js
   + store文件夹 vuex，管理数据中心
     + 在里面可以提前新建一个modules文件夹和index.js文件
   + utils文件夹 工具类，存放封装好的方法【如axios请求的再次封装】
   + views 页面，内容组件，展示内容用
     + 可以提前创建一个404的vue路由组件，NotFound.vue,放点内容如页面飞走了！！

<hr>

### 项目开发

1. 重置样式
    - 在assets目录创建reset.css文件重置样式
```
body, div, span, header, footer, nav, section, aside, article, ul, dl, dt, dd, li, a, p, h1, h2, h3, h4,h5, h6, i, b, textarea, button, input, select, figure, figcaption {
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    font-family: "Microsoft Yahei",sans-serif;
    -webkit-tap-highlight-color:transparent;
    -webkit-font-smoothing: antialiased;
}

input:focus {
   outline: none;
}

input[type="button"], input[type="submit"], input[type="search"], input[type="reset"] {
    -webkit-appearance: none;
}

textarea { -webkit-appearance: none;}

html,body{
    height: 100%;
    width: 100%;
}
.clear:after{
    content: '';
    display: block;
    clear: both;
}
.clear{
    zoom:1;
}
```
> 引入该文件<br>
> 在main.js文件中引入<br>
```
import './assets/reset.css'
```

<hr>

> 使用重置样式插件<br>
> 介绍：Normalize.css只是一个很小的css文件，但它在磨人的HTML元素样式上提供了跨浏览器的高度一致性。相比于传统的CSS reset,Normalize.css是一种现代的、为HTML5准备的优质替代方案。总之，Normalize.css是一种CSS reset的替代方案。
```
# 安装重置样式插件
npm install --save normalize.css  /或者"reset-css": "^5.0.1",
# main.js 引入
import 'normalize.css/normalize.css'
```

2. 安装ui库

> `npm i element-ui@2.15.6 -S`<br>
> 日期组件会有问题，版本选择2.15.6
+ `main.js`入口文件引入【全局js文件】
    ```
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css' // 全局引入样式

    Vue.use(ElementUI,{ size: 'mini'}) // 设置所有的ui都为小号
    ```

3. 构件项目的布局页面【layout文件夹下操作】

> 首先得有一个大的路由组件，由于之前在App.vue已经放了展示容器，直接在layout文件夹下创建一个Layout.vue文件，并添加点内容<br>
> 注册，找到路由文件夹创建一个index.js<br>
> index.js文件配置路由，导入vue、vue-router、导入该路由组件取个组件名，注意大驼峰
```
import Vue from "vue"
import VueRouter from 'vue-router'
import Layout from '../layout/Layout.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter) // Vue上注册使用

const routes = [
    {
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/layout', // 注意一级路由路径带/，而从二级路由开始不带/，一般最多三级路由。
        name: 'layout',
        component: Layout
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
    routes
})

export default router
```
> 在入口文件main.js导入刚刚暴露的路由，挂到vue实例身上，npm run serve运行即可打开页面看一下Layout.vue里面内容是否生效

> 预览布局划分，划分完在element-ui找到合适的布局容器，复制代码粘贴过来【直接粘贴到template下，外层可以包div也可以不包】

```
<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
```
> 注意样式也要copy过来放到style标签里面[可带style也可不带]

```
   .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
   }

   .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
   }

   .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
   }

   body > .el-container {
    margin-bottom: 40px;
   }

   .el-container:nth-child(5) .el-aside,
   .el-container:nth-child(6) .el-aside {
    line-height: 260px;
   }

   .el-container:nth-child(7) .el-aside {
    line-height: 320px;
   }
```
> 再看一下效果怎么样，发现高度存在一定问题，这时候需要把三个根元素高度设置100%，并设置到全局{公有}样式里=>App.vue

```
html,body,#app{
    height: 100%;
}
```
> 发现还是没占满，鼠标右键再接着看里面元素，发现咱们复制粘贴过来的容器高度不是100%，于是再回到Layout.vue,在样式最上面设置容器高度100%
```
.el-container {
    height: 100%;
}
```
> 复制粘贴过来的样式清除一下不需要的，只保留区块背景色

> 可以发现主题内容区域是切换的并是由侧边栏控制，可以想到二级路由，先提前到切换内容的地方放上容器占位[把main文本替换位容器即可]，创建二级路由组件[layout文件夹一般只放最大的布局路由组件]，我们需要在views文件夹下创建home文件夹=>home目录下创建home.vue和components未来放子组件[注意vue文件名要采用大驼峰]

> 可以在Home.vue放一点内容文本如Home,方便查看路由是否配置成功

【注：路由组件三步，容器占位=>创建路由组件=>路由里面注册】

> 创建完就得注册了，进入`router/index.js`,首先就是引入二级路由组件，注意一个关键属性children,【注意路由配置这里都是数组里套对象，数组可以放多个路由配置】,然后写上配置对象

```
    {
        path: '/layout',
        name: 'layout',
        component: Layout,
        redirect: '/layout/home', // 填完整路径【一般是首页，重定向】
        children: [
               {
               path: 'home', // 不要带/
               name: 'home',
               component: Home
            }
        ]
    },
```

> 接着咱们可以多创建几个二级路由组件，并进行配置，平级的路由只需要第一个放容器就行，路径=>互相切换内容，只需要注册好即可,在地址栏把hash值home替换为user测试一下

> 左边侧边栏可以先用类似a标签的`router-link`，to是path值[已经是在layout下了，也可以写完整路径`/layout/home`]

```
<router-link to="home">home</router-link>
<router-link to="user">user</router-link>
```
> 测试一下可以跳转即可

4. 开始书写内容区，划分内容区组件【路由组件home为父组件在里面划分出子组件】

> 划分为上中下，mySearch、myTable、myPage，首先子组件别名占位【注意是在父组件里】=>创建子组件=>在父组件里注册【这三步和路由组件差不多,组件别名个人习惯大驼峰包括组件文件名也是】

> 搜索组件应用：
> 书写MySearch.vue里面内容：
> 在子组件MySearch.vue文件里开始写内容，观察布局一左一右，刚好外层有个div里面直接使用两个div,再使用Element-ui组件【书写内容之前布置布局很重要，一般都是外面套div使用flex布局】

【注意把v-model对应的数据也一起复制过来，不然会报错】

> 复制过来后样式需要调整，采用样式覆盖【采用less嵌套语法，层级不够就在类名前面加上`/deep/`】

> 书写MySearch.vue里面内容：
> 这个可以直接复制粘贴表格组件即可

> 表格组件应用：

```
表格两种写法：
<!-- slot-scope作用域插槽，template空标签，scope就当成变量即可，scope.row就是当前行数据 -->
<template slot-scope="scope">{{ scope.row.date }}</template>

<!-- label表头，prop指定的字段, 宽度去掉就会自适应 -->
<el-table-column prop="name" label="姓名" width="120">
```

> 自定义表格数据，替换字段即可

> 分页组件

直接复制过来，对齐进行位置处理外面套个div，使用flex布局
















todo: 总结继续写！！！！！！

```
vue搭建项目总结：网站只有一个index.html同时里面只放了一个div同时添加一个id，值为app，它
就是我们的App.vue的挂载点，而App.vue作为根组件，它里面模板只放一个router-view，它是容器，
页面上展示的内容不到这里面写，style里面一般只放公共样式，去掉作用域scoped，由于不放页面
内容，访问首页、注册页、登录页都得用到一个-->路由，首页布局就是一个大的路由组件，注册登录页
也是，路由组件对应一个路径，所以我们需要到路由上进行注册，而路由最终也会挂到vue实例上，
路由组件与App.vue如何产生联系，主要就是一起作为配置项，整合到一块了，页面输什么路径展示对应
的路由组件，除了对应路径它也对应一个路由容器，主要是放在父组件里，占位置；至于路由组件的
内容又得划分【一般不会超过3层】，哪一块内容固定的[例如导航栏、侧边栏一般固定，可以在路由
组件里面直接写]，哪一块内容切换的【这些内容一般针对于布局，像主内容区来说】，切换某一块区域
内容整个区域就得归为路由组件[二级路由],按照顺序一般是先在父组件里找到位置放容器，然后创建
二级路由组件，随便写上一点内容，去router目录下index.js进行注册，注册先引入二级路由组件，
注意二级路由的path值不能带/，接着运行一下，直接在地址栏后面输入path值，看下二级路由是否生效，
写上的内容是否能展示。路由跳转一般就两种,声明式跳转，编程式跳转。

一个路由组件对应一个容器[要展示的地方]和一个路径hash值

【备注：】同时二级重定向写在父亲的路由配置项上，注意写完整路径，/父亲/儿子。
```

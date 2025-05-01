# 基于React和Electron的字幕处理桌面工具
因心血来潮，在五一假期期间的一两天中，研究和学习React和Electron，在基于Python和PySide6开发的工具[SubtitleCoder](https://github.com/liuweixu/SubtitleCoder)的基础上，使用React和Electron进行重构为可以安装的桌面应用软件。

## 功能
### 已开发的功能
- 基于Alass对日语SRT字幕与对应的中文ASS字幕对齐
- 对ASS字幕进行各种处理
  - 修改ScaledBorderAndShadow（涉及到字幕是否加粗和描边）
  - 修改目标样式对应的字体名称
  - 修改目标样式对应的样式信息
- 对SRT转换为相应的ASS字幕，并且可以自定义样式
### 待开发的功能
- 从MKV视频或ASS字幕中提取相应的中文字幕或日语字幕


## 技术栈
- React
  - 脚手架：React-Vite 版本：18.0.0
- Electron
- JavaScript
- Node.js
- TailwindCSS
- Ant Design
  - 主要使用的组件库

## 安装和使用说明
### 脚手架
使用React-Vite脚手架进行开发，因为Create-React-App脚手架虽然使用较为广泛，也容易入门，是主要使用的脚手架之一，但是该脚手架存在不少问题：
- 被React官方宣布弃用和不再维护
- 不支持SWC编译器
- 和TailWindCSS不兼容
- 打包过于慢，在Packaging阶段打包中经常花费10分钟以上的时间
- 时常出现各种莫名其妙的问题

而React-Vite配置较为简单，配合SWC编译器（安装其脚手架中，可以选择安装SWC编译器，十分方便）可以快速打包，并且打包速度很快，打包体积相对来说比较小一些，可以支持TailWindCSS，所以本次使用React-Vite脚手架进行开发。

然后，在**版本**的选择上，因为Ant-Design等不少组件库与React19不兼容，所以本次选择React18.0.0版本。

### 安装依赖
```bash
# 使用 Vite 创建 React 项目，指定模板为 react，指定编程语言为JavaScript+SWC
npm create vite@latest my-app --template react
cd my-app
# 卸载默认安装的最新 React 版本
npm uninstall react react-dom
# 安装 React 18.0.0 和 React DOM 18.0.0
npm install react@18.0.0 react-dom@18.0.0
# 安装 peer dependencies
npm install @types/react@18.0.0 @types/react-dom@18.0.0
# 安装 Electron 和必要的工具
npm install electron electron-builder vite-plugin-electron --save-dev
# 安装 cross-env 用于跨平台环境变量设置
npm install cross-env --save-dev
# 安装 Ant Design
npm install antd
# 安装 TailwindCSS
npm install -D tailwindcss postcss autoprefixer
```
以上是本项目所需要的依赖，具体的依赖版本可以查看package.json文件。

### 运行
```bash
# 开发
# 启动 React 开发服务器
npm run dev
# 启动 Electron 开发服务器
npm run electron

# 打包
npm run electorn:build
```
目前package.json中只配置win的打包命令，如果需要，可以自行添加mac和linux的打包命令。
打包后，在release文件夹中可以找到打包好的exe文件，运行时可以直接安装和使用，也可以不用安装，只需要点击其中一个文件夹，里面也有exe文件，直接运行即可。

### 程序的注意事项
- 在使用React-Vite脚手架创建项目时，在创建项目时，需要选择JavaScript+SWC作为编程语言。因为SWC编译器可以更快地编译代码，并且可以支持React的最新特性。
- 在与React相关的程序中（src文件夹下），涉及到的js程序文件的后缀名必须为jsx，而不是js。而与Electron相关的程序中（electron文件夹下），涉及到的js程序文件的后缀名可以为js。
- 在Electron中，使用Node.js的API写程序，需要使用import语句导入，而不是require语句导入。
- 对本地文件进行读写处理、运行本地命令等操作时，需要在Electron中进行编写，然后将处理结果通过ipcMain和ipcRenderer方式与React进行通信（也就是传递数据）即可。
- 打包时，需要注意package.json文件中的build字段中的file等字段是否把需要打包的文件都包含进去，比如dist和electron文件夹下的所有文件等。

## 感受
该桌面软件是我心血来潮，对React和Electron突然感兴趣，趁着五一假期有空的时候，就开始了学习和开发，但是因为开发时间很仓促（不到两天），所以目前就开发了3个主要功能，还剩1个功能并没有开发完成，而且界面并不是很完善，所以该软件并不太成熟，可能存在一些bug，如果大家发现了bug，可以在issue中或者通过邮件wei_xu_liu@163.com提出，我会尽快修复。

## 感谢
- [Ant Design组件库](https://ant-design.antgroup.com/index-cn)
- [黑马React视频教程](https://www.bilibili.com/video/BV1ZB4y1Z7o8?spm_id_from=333.788.videopod.episodes&vd_source=601da5164f2780fc668c82ddd0d54bcf)
- [黑马React笔记](https://blog.csdn.net/2301_80182418/article/details/145483587)
- [create-react-app迁移到vite的教程](https://segmentfault.com/a/1190000044980287)
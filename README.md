# 基于React和Electron的字幕处理桌面工具
在基于Python和PySide6开发的工具[SubtitleCoder](https://github.com/liuweixu/SubtitleCoder)的基础上，使用React和Electron进行重构为可以安装的桌面应用软件。

## 功能
### 已开发的功能
- 基于Alass对日语SRT字幕与对应的中文ASS字幕对齐
- 对ASS字幕进行各种处理
  - 修改ScaledBorderAndShadow（涉及到字幕是否加粗和描边）
  - 修改目标样式对应的字体名称
  - 修改目标样式对应的样式信息
### 待开发的功能
- 从MKV视频或ASS字幕中提取相应的中文字幕或日语字幕
- 对SRT转换为相应的ASS字幕，并且可以自定义样式

## 技术栈
- React
  - 脚手架：React-Vite 版本：18.0.0
- Electron
- JavaScript
- TailwindCSS
- Ant Design
  - 主要使用的组件库

## 安装说明
### 脚手架
使用React-Vite脚手架进行开发，因为Create-React-App脚手架虽然使用较为广泛，也容易入门，是主要使用的脚手架之一，但是该脚手架存在不少问题：
- 被React官方宣布弃用和不再维护
- 不支持SWC编译器
- 和TailWindCSS不兼容
- 打包过于慢，在Packaging阶段打包中经常花费10分钟以上的时间
- 时常出现各种莫名其妙的问题

而React-Vite配置较为简单，配合SWC编译器（安装其脚手架中，可以选择安装SWC编译器，十分方便）可以快速打包，并且打包速度很快，可以支持TailWindCSS，所以本次使用React-Vite脚手架进行开发。

然后，在**版本**的选择上，因为Ant-Design等不少组件库与React19不兼容，所以本次选择React18.0.0版本。

### 安装过程

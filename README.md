# Shanghai Interactive Map

**Unveiling Shanghai: A Juxtaposed Map of Memory**

一个交互式的上海今昔对比地图项目，展示城市变迁背后的故事。

## 项目状态

✅ **基础框架已完成** - 查看 [项目进度.md](./项目进度.md) 了解详细信息

## 快速开始

### 运行项目

```bash
cd "/Users/xiaobowen/Desktop/Shanghai Web"
python3 -m http.server 8080
```

然后在浏览器中打开：`http://localhost:8080`

### 项目结构

```
Shanghai Web/
├── index.html              # 主页面
├── styles.css              # 样式文件
├── script.js               # JavaScript逻辑
├── fonts/
│   └── Broadway Regular.ttf # Broadway字体
├── images/
│   ├── shanghainew.png     # 现代上海地图（待替换为矢量图）
│   └── shanghaiold.jpg     # 老上海地图
├── 矢量图使用说明.md        # 矢量图使用指南
├── 项目进度.md              # 项目进度文档
└── README.md               # 本文档
```

## 功能特性

- 🗺️ **交互式地图对比** - 使用 JuxtaposeJS 实现今昔地图对比
- ✨ **滚动动画** - 标题随滚动淡入淡出
- 🎯 **可点击区域** - 矢量图上的可点击区域（开发中）
- 📖 **动态叙事** - 根据区域显示不同的叙事内容
- 🎨 **现代设计** - 简洁的白色设计，Broadway 字体

## 技术栈

- HTML5/CSS3
- JavaScript (ES6+)
- JuxtaposeJS - 地图对比滑块
- SVG - 矢量图和可点击区域
- Intersection Observer API - 滚动动画

## 开发计划

### 今晚任务
- [ ] 导入矢量图文件
- [ ] 调整矢量图与老地图的对齐
- [ ] 添加至少一个可点击点

### 后续优化
- [ ] 添加更多可点击区域
- [ ] 优化用户体验
- [ ] 性能优化

## 使用说明

### 矢量图导入

详细说明请查看 [矢量图使用说明.md](./矢量图使用说明.md)

### 添加可点击区域

在 `script.js` 的 `clickableRegions` 数组中配置：

```javascript
{
    id: 'pudong',
    type: 'circle',
    cx: 500,  // x坐标
    cy: 400,  // y坐标
    r: 50,    // 半径
    region: 'pudong'  // 对应narrative区域
}
```

## 浏览器支持

- Chrome/Edge（推荐）
- Firefox
- Safari
- 移动浏览器

## 许可证

本项目为学术用途。

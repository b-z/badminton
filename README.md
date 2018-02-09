# A badminton game

## Todo list

* [x] 视角支持3D查看 orz

## 开发日志

### 2018年2月10日

* 加入击球回弹
  ![](img_doc/18021002.png)

### 2018年2月9日

* 捡起之前的代码
* 这个版本的羽毛球的运动公式⤵️，在给定羽毛球的起始位置和经过时间之后可以直接计算出羽毛球运动后的位置，比汇编版逐帧算要方便很多。
* player是有身高、速度等属性的。。。
* 人的运动加上了，加入了击球判定
  ![](img_doc/18021001.png)

###2016年6月18日

* 实现透视效果

  ![](img_doc/061801.png)

* 羽毛球的运动模型

  $$\vec {x_t} = \vec{c_1}+\vec{c_2}e^{-\gamma t}+\frac{\vec{g}}{\gamma}t$$

  $$\vec{v_t} = -\gamma \vec{c_2}e^{-\gamma t}+\frac{\vec{g}}{\gamma}$$

  $$\vec{c_1}+\vec{c_2} = \vec{x_0}$$

  $$\frac{\vec{g}}{\gamma}-\gamma \vec{c_2} = \vec{v_0}$$

### 6月17日

* 添加readme
* 添加Player类、Ball类、Point类、Info类、Vector类
* 实现ball的debug绘制

### 6月16日

* 建立基本的框架

* 图片加载(Loader类)与绘制(Paintbrush类)功能

* 绘制调试信息

  ![](img_doc/061601.png)
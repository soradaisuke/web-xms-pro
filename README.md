# 概述

本质上是对以下技术的二次封装

* [ProComponents](https://procomponents.ant.design/)
* [ahooks](https://ahooks.js.org/zh-CN/)
* [umi-request](https://github.com/umijs/umi-request)

# 为什么放弃XMS而选择封装ProComponents

* ProComponents和XMS在本质的设计思路上很像，ProSchema === XMS Column，甚至很多配置项的命名和作用都一样
* 现有功能比XMS更完善 
* 有专门的团队持续扩展和维护
* 有产品和设计团队支持

# XMS-PRO做了什么

* 对[ProSchema](https://procomponents.ant.design/components/schema)的配置项进行扩展，并增加了自定义的valueType
* 针对前端CURD页面的业务场景进行了扩展
* 默认使用蜻蜓的后端请求规范
* 支持单独使用XMS-PRO的组件（如在XMS里使用XMS-PRO组件）或者像XMS一样实现全配置化页面
* 修复ProComponents的一些BUG

# 参考项目

* [dms](https://git2.qingtingfm.com/data/dms)和[dwms](https://git2.qingtingfm.com/data/dwms)都在某些页面混合使用了XMS-PRO的组件
* [dwms的staging分支](https://git2.qingtingfm.com/data/dwms/-/tree/staging)正在做XMS-PRO的全面迁移


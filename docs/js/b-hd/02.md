# 第 2 章 在HTML中使用JavaScript

## 2.0 预览

本章节主要描写在HTML中使用JavaScript的一些方法和注意事项。





## 2.1 `<script>`的async和defer属性

由于加载`<script>`标签会使浏览器引擎堵塞，所以`<script>`支持两种异步加载js脚本的方法：

* `async`属性会使`<script>`异步加载完毕后立刻执行，这表示加载两个js脚本，有可能会出现下方的脚本先于上方的脚本执行；
* `defer`属性同样会使`<script>`异步加载，不过必须要页面上的所以js脚本加载完毕后，在由上至下顺序执行。
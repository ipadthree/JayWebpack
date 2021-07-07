笔记：
---
-----
`node_modules/.bin`里面是包括webpack在内的所有cli command的entry. 用`node_modules/.bin/webpack`就可以执行webpack cli command。 it’s just the path to our webpack command

-------
Out of the box, webpack won't require you to use a configuration file. However, it will assume the entry point of your project is src/index and will output the result in dist/main.js minified and optimized for production.

------

`"start": "webpack serve"` 就是启动dev server

------

`npm i -D babel-loader @babel/core @babel/preset-env`

babel-loader 就是让webpack认识syntax的方法
preset-env就是default lasted 2 browser support什么的,相当于一些default的babel setup
`"@babel/preset-react"` 就是让babel能编译react的default 设置

`presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]]`
这样设置就可以在react 17里不用import React from 'react'

-----

`webpack --mode=production`  build in prod mode

-----

`style-loader`  会把CSS inject 到 javascript里。
`mini-css-extract-plugin` 会create一个大的综合Css separate file

为什么要separate的css呢？
如果css和js在一起的话，css也是在script里，那load的时候就要和js一起load，不能分开
会慢，如果html的skeleton先parse了，会有 unstyle content 的flash

-----

webpack 不加config的default就是找`src/index.js`，输出是`dist/main.js`

-----

`"build-dev": "webpack --config webpack.config.js",`

直接告诉webpack用这个config file，或者`webpack.config.js`也可以叫别的名字，比如`webpack.dev.js` `webpack.common.js`但是就要在这里特别表明。webpack.config.js 这个名字不加config也默认找它config

------
webpack 会把import这些东西转化成自己的webpack require

-------

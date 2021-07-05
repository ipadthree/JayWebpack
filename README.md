笔记：
---
-----
`node_modules/.bin`里面是包括webpack在内的所有cli command的entry. 用`node_modules/.bin/webpack`就可以执行webpack cli command。 it’s just the path to our webpack command

-------
Out of the box, webpack won't require you to use a configuration file. However, it will assume the entry point of your project is src/index and will output the result in dist/main.js minified and optimized for production.

------

`"start": "webpack serve"` 就是启动dev server

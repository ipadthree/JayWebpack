module.exports = {
    /**
     * ['@babel/preset-react', { runtime: 'automatic' }] 这样设置就可以在react 17里不用import React from 'react'
    */
    presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
};

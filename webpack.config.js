const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/**
 * 这个是webpack自己的dependency，不用我们install
 */
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

let mode = 'development';

/**
 * "build": "NODE_ENV=production webpack --mode=production",
 * 从这上面这里得到NODE_ENV variable
 */
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
}

module.exports = {
    /**
     * entry如果不加的话default也是"./src/index.js"，
     * 就是从这个file开始webpack开始bundle，
     * 加了就可以customize从哪里开始。
     */
    // entry: './src/index.js',

    /**
     * entry也可以是个object，里面就是多个entry以及他们入口。
     * 然后html webpack plugin可以把这几个bundle都用script tag加到index.html中
     */
    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js',
    },
    mode: mode,

    output: {
        /**
         * 输出的bundle的name
         * contenthash使用所有content来计算一个hash，只要有一个character变了，hash全变，导致filename变了
         * 这样就让browser cache知道这是个新的东西，不cached from disk
         * 必须是小写contenthash。。。要不然webpack不认识
         *
         * [name]就让output的filename和entry的file name 一样
         */
        // filename: 'main.[contenthash].js',
        filename: '[name].[contenthash].bundle.js',
        /**
         * 把image都放到output的这个folder里。
         * 这个folder可以任意取名
         *
         * 旧的方法需要
         * use: {
         *  loader: "file-loader",
         *  options: {
         *      name: "[name].[hash].[ext]",
         *      outputPath: "assets",
         *  }
         * }
         * 来做这些
         */
        assetModuleFilename: 'assets/[hash][ext][query]',
        /**
         * 决定output的path是哪
         * 这里需要个absolute path,path.resolve()就是给absolute path
         * __dirname给的是现在的directory
         */
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                /**
                 * js or jsx ending files
                 */
                test: /\.jsx?$/, //regex tests
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/i,
                use: [
                    /**
                     * {
                     *  loader: MiniCssExtractPlugin.loader,
                     *  options: { publicPath: "" },
                     * }
                     * webpack的loader即可以用string format，也可以用这种object，提供option
                     * MiniCssExtractPlugin.loader,是把css单独separate成一个css file，在html里加一个<link> tag
                     *
                     * css-loader只是把css turn into js
                     * style-loader可以inject这个Css到DOM,用添加一个<style> tag（是style tag！）
                     * ["style-loader", "css-loader"]
                     */
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                /**
                 * webpack 5的新方法
                 * type: "asset/resource"会把assets output
                 *
                 * 旧的方法是用html-loader & file-loader
                 * html-loader是在html file中遇到<img src="blabla">就会用js require('blabla');
                 * {
                 *  test: /\.html$/,
                 *  use: ['html-loader'],
                 * }
                 *
                 * file-loader是对于以上/\.(png|jpe?g|gif|svg)$/ 这种图片文件可以
                 * import image from '.image/someImage.svg';
                 * 实现import并且bundle到output dist folder里的
                 */
                type: 'asset/resource',
                /**
                 * type: "asset/inline", 会把asset放到js里,就变成了base64 text encoded了
                 * 但是inline的话会导致code package很容易过大
                 */
                /**
                 * type: 'asset',的话就让webpack自己来决定是inline还是output出来
                 * size小的话就inline，大的就output
                 * 也可以自己来决定这个threshold，如下：
                 * parser: {
                 *  dataUrlCondition: {
                 *      maxSize: 30 * 1024,
                 *  }
                 * }
                 */
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        /**
         * new MiniCssExtractPlugin(),也可以什么都不加。
         */
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            /**
             * HtmlWebpackPlugin 会自动加上css 和 script的link line，不用我们手动加
             */
            template: './src/index.html',
        }),
    ],
    resolve: {
        /**
         * import的时候就不用加下面的这些extension了，自动就可以加入。
         * 要不然import jsx的时候如果不加后缀会error
         */
        extensions: ['.js', '.jsx'],
    },

    optimization: {
        /**
         * OptimizeCssAssetsPlugin minimize css
         * 如果没有设置optimization的话webpack default会用TerserPlugin来minimize JavaScript
         * 但是我们设置了OptimizeCssAssetsPlugin，那就要explicitly再手动加上TerserPlugin
         * 要不然override了，js就没有default的 minimize了
         */
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
    },

    devServer: {
        contentBase: './dist', //应该这意思是从这个path开始serve content
        hot: true, // hot reloading.和live reload不一样。HMR只改变app一部分，而不是重新reload整个app,不改变比如state
    },

    // devtool: "source-map",
};

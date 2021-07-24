const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const config = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'public'), //指定打包好的文件，输出到哪个目录中去
        filename: 'bundle.js' //这是指定 输出的文件的名称
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        }],
    },

    plugins: [
        new MiniCssExtractPlugin({
            //生成css的文件名
            filename: 'boudle.css'
        }),
        // 使用这个插件会把/src/index.html作为模板生成到输出目录下
        //如果不设置则自动会在输出目录下生成index.html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        })
    ],

    devtool: 'inline-source-map',
    //设置环境
    mode: 'development',
    devServer: {
        //服务器的根目录和上面输出目录保持一致
        contentBase: path.join(__dirname, "public"),
        compress: false,
        host: '0.0.0.0',
        port: 9000,
        //是否热更新
        hot: true,
        //是否自动打开浏览器
        // open: true, 
    }
};

module.exports = config;
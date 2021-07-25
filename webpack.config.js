const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//默认生成目录,如果不存在会自动创建盖目录
const dist_dir = path.join(__dirname, 'dist');
//自定义生成目录
// const dist_dir = path.join(__dirname, 'public');


const config = {
    entry: './src/index.js',
    output: {
        path: dist_dir, //指定打包好的文件，输出到哪个目录中去
        filename: 'bundle.js', //这是指定 输出的文件的名称
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        }, {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
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
            inject: 'body', // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
        })
    ],

    devtool: 'inline-source-map',
    //设置环境
    mode: 'development',
    devServer: {
        //服务器的根目录和上面输出目录保持一致
        contentBase: dist_dir,
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
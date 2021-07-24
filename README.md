# hello_webpack

项目目录结构
```
--project_root
public
src
    css
        style.css
    index.html
    index.js
package.json
webpack.config.js
README.md
```

相关依赖和插件的安装
```
#安装依赖
npm i --save-dev webpack webpack-cli webpack-dev-server
npm i --save-dev css-loader
npm i --save-dev babel-loader @babel/core @babel/preset-env

#安装插件
npm i --save-dev html-webpack-plugin mini-css-extract-plugin

```
#package.json配置脚本
```
webpack-cli 4.0以上
"dev": "webpack serve --mode development",

webpack-cli 4.0以下
"dev": "webpack-dev-server --mode development",

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production"
},

```
一个基本的webpack.config.js
```
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
        filename: 'bundle.js' //这是指定 输出的文件的名称
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
```
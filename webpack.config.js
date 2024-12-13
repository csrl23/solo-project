const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CopyPlugin = require('copy-webpack-plugin'); 

module.exports = {
    mode: 'development', 
    entry: {
        main: path.resolve(__dirname, './src/client/App.jsx'), 
    },
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'bundle.js',
    }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react'
                        ],
                    },
                },
            }, 
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'], 
            }, 
        ],
    }, 
    resolve: {
        extensions: ['.jsx', '.js'], 
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html', 
            filename: './index.html',
        }), 
        new CopyPlugin({
            patterns: [{ from: './src/client/style.css' }], 
        }), 
    ], 
    devServer: {
        // static: path.resolve(__dirname, 'dist'), 
        // port: 3000, 
        // historyApiFallback: true, 
        // proxy: {
        //     '/linguai': 'http://localhost:3000', 
        //     secure: false,
        // },
        proxy: [
            {
                context: ['/verbs', '/vocabs'],
                target: 'http://localhost:8080', 
                changeOrigin: true,
                secure: false,
            }
        ],
        port: 3000, 
        // proxy: {
        //     '/verbs': 'http://localhost:8080',
        // },
        // historyApiFallback: true, 
        // open: true, 
    },
};
let path = require('path');

let webpack = require('webpack');
let RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');

let plugins = [];

let env = process.env.NODE_ENV;

if (env === 'production') {
    plugins = [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV === 'production' ? 'production' : 'development'
            )
        })
    ];
} else if (env === 'analyze') {
    plugins = [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV === 'production' ? 'production' : 'development'
            )
        }),
        new RuntimeAnalyzerPlugin({
            mode: 'standalone',
            port: 0,
            open: true,
            watchModeOnly: true
        })
    ];
}


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/static'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'}
        ]
    },
    plugins
};

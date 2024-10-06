const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./src/index.ts'],
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'game.bundle.js'
    },
    devServer: {
        compress: true,
        port: 9000
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
            ],
        }),
        new HtmlWebpackPlugin({
            title: "Pixi Slots"
        })
    ]
};

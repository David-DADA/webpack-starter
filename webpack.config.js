const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeAssetsCssPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeAssetsCssPlugin() ]
    },
    module: {
        rules:[
            {
                test: /\.css/,
                exclude: /styles\.css/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    attributes: false,
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule:false
                        }
                    }                    
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false            
        }),

        new CopyPlugin({
            patterns: [
            { from: 'src/assets', to: 'assets/' },
        ],
        }),

    ]

}
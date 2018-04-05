
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
// const SpriteLoaderPlugin = require('svg-sprite-loader');



const PATHS = {
    source: path.join(__dirname, '/source'),
    build: path.join(__dirname, '/build'),
    admin: path.join(__dirname, '/admin')
};


module.exports = {
    entry: {
        'index': PATHS.source + '/pages/index/index.js',
        'about': PATHS.source + '/pages/about/about.js',
        'work': PATHS.source + '/pages/work/work.js',
        'blog': PATHS.source + '/pages/blog/blog.js',
        'admin':PATHS.admin + '/main.js'
    },
    output: {
        path: PATHS.build,
        filename: './js/[name].js'
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index', 'common'],
            template: PATHS.source + '/pages/index/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            chunks: ['about', 'common'],
            template: PATHS.source + '/pages/about/about.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'work.html',
            chunks: ['work', 'common'],
            template: PATHS.source + '/pages/work/work.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'blog.html',
            chunks: ['blog', 'common'],
            template: PATHS.source + '/pages/blog/blog.pug'
        }),
        new CleanWebpackPlugin('build'),
        new ExtractTextPlugin('./css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        // new SpriteLoaderPlugin(),
        
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader',],
                }),
            },
            {
                test: /\.(png|jpeg|jpg|gif|woff|woff2|ico|svg|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    { 
                        loader: "style-loader"
                    },
                    { 
                        loader: "file-loader" 
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  esModule: false,
                  loaders: {
                    'scss': [
                      'vue-style-loader',
                      'css-loader',
                      'sass-loader'
                    ],
                    'sass': [
                      'vue-style-loader',
                      'css-loader',
                      'sass-loader?indentedSyntax'
                    ]
                  }
                  // other vue-loader options go here
                }
            },
        
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-sprite-loader', 
            //     include: path.resolve(__dirname, 'source/commons/sprite/to_sprite/'),
            //     options: {
            //       extract: true,
            //       spriteFilename: 'source/commons/sprite/sprite.svg'
            //     }
            // }

        ]
    }
}
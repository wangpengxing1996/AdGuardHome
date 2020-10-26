const history = require('connect-history-api-fallback');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
const proxy = require('http-proxy-middleware');
const Webpack = require('webpack');

const { getDevServerConfig } = require('./helpers');
const baseConfig = require('./webpack.config.base');

const target = getDevServerConfig();

const RESOURCES_PATH = path.resolve(__dirname, '../../');
const HTML_PATH = path.resolve(RESOURCES_PATH, 'public/index.html');
const HTML_INSTALL_PATH = path.resolve(RESOURCES_PATH, 'public/install.html');


const options = {
    target: `${target.host}:${target.port}`, // target host
    changeOrigin: true, // needed for virtual hosted sites
  };
const apiProxy = proxy.createProxyMiddleware(options);

module.exports = merge(baseConfig, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../../build'),
        filename: '[name].bundle.js',
    },
    optimization: {
        noEmitOnErrors: true,
    },
    devServer: {
        hot: true,
        port: 3000,
        historyApiFallback: true,
        before: (app) => {
            app.use('/control', apiProxy);
            app.use(history({
                rewrites: [
                    {
                        from: /\.(png|jpe?g|gif)$/,
                        to: (context) => {
                            const name = context.parsedUrl.pathname.split('/');
                            return `/images/${name[name.length - 1]}`
                        }
                    }, {
                        from: /\.(woff|woff2)$/,
                        to: (context) => {
                            const name = context.parsedUrl.pathname.split('/');
                            return `/${name[name.length - 1]}`
                        }
                    }, {
                        from: /\.(js|css)$/,
                        to: (context) => {
                            const name = context.parsedUrl.pathname.split('/');
                            return `/${name[name.length - 1]}`
                        }
                    }
                ],
            }));
        }
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    configFile: path.resolve(__dirname, '../lint/dev.js'),
                }
            },
            {
                test: (resource) => {
                    return (
                        resource.indexOf('.pcss')+1
                        || resource.indexOf('.css')+1
                        || resource.indexOf('.less')+1
                    ) && !(resource.indexOf('.module.')+1);
                },
                use: ['style-loader', 'css-loader', 'postcss-loader', {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                    },
                }],
            },
            {
                test: /\.module\.p?css$/,
                use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 1,
                                modules: {
                                    localIdentName: "[name]__[local]___[hash:base64:5]",
                                }
                            },
                        },
                        'postcss-loader',
                ],
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new Webpack.DefinePlugin({
            DEV: true,
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            cache: false,
            chunks: ['main'],
            template: HTML_PATH,
        }),
        new HtmlWebpackPlugin({
            inject: true,
            cache: false,
            chunks: ['install'],
            filename: 'install.html',
            template: HTML_INSTALL_PATH,
        }),
    ],
});

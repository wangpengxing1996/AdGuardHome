const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');
const Webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { mainUrl } = require('../urls');

const analyze = process.argv.indexOf('--analyze') !== -1;

const options = {
    target: mainUrl, // target host
    changeOrigin: true, // needed for virtual hosted sites
  };
const apiProxy = proxy.createProxyMiddleware(options);

module.exports = merge(baseConfig, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../../build'),
        filename: 'app.bundle.js',
    },
    optimization: {
        noEmitOnErrors: true,
    },
    devServer: {
        host: "local.serveroid.com",
        port: 3000,
        historyApiFallback: true,
        before: (app) => {
            app.use('/api/v1', apiProxy);
            app.use('/auth', apiProxy);
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
        new BundleAnalyzerPlugin({
          analyzerHost: '127.0.0.1',
          analyzerMode: analyze ? 'server' : 'disabled',
          analyzerPort: 8888,
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
        }),
    ],
});

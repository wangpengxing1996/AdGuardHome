const path = require('path');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const tsconfig = require('../../tsconfig.json');


module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.pcss'],
        alias: Object.keys(tsconfig.compilerOptions.paths).reduce((aliases, key) => {
            // Reduce to load aliases from ./tsconfig.json in appropriate for webpack form
            const paths = tsconfig.compilerOptions.paths[key].map(p => p.replace('/*', ''));
            aliases[key.replace('/*', '')] = path.resolve(
                __dirname,
                '../../',
                tsconfig.compilerOptions.baseUrl,
                ...paths,
            );
            return aliases;
        }, {}),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options:{
                        outputPath:'./',
                    }
                }],
            },
            {
                test:/\.(png|jpe?g|gif)$/,
                exclude: /(node_modules)/,
                use:[{
                    loader:'file-loader',
                    options:{
                        outputPath:'./images',
                    }
                }]
            }
        ],
    },

    plugins: [
        new AntdDayjsWebpackPlugin()
    ],
};

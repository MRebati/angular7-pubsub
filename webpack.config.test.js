const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

const metadata = {
    env: ENV,
    host: HOST,
    port: PORT
};

module.exports = {
    debug: true,
    devtool: 'inline-source-map',
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts', query: { compilerOptions: { noEmit: false } } }
        ]
    },
    plugins: [
        new DefinePlugin({ 'webpack': { 'ENV': JSON.stringify(metadata.env) } })
    ],
    resolve: {
        extensions: ['', '.ts', '.js']
    }
};
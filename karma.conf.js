module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['mocha'],
        singleRun: true,
        preprocessors: { './karma-test-runner.js': ['webpack', 'sourcemap'] },
        files: [
            { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false },
            { pattern: './karma-test-runner.js', watched: false }
        ],
        webpack: require('./webpack.config.test.js'),

        webpackServer: { noInfo: true }
    });
};
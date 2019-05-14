var path = require('path');

module.exports = {
    // entrypoint for our javascript app
    entry: './src/main/js/app.js',
    // sourcemaps to link back to original source code
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    // the below element compiles all of our javascript into bundle.js, all the custom code AND dependencies
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    // hooking into babel engine using es2015 and react presets to compile ES6 React code
    module: {
        rules: [
            {
               test: path.join(__dirname, '.'),
               exclude: /(node_modules)/,
               use: [{
                   loader: 'babel-loader',
                   options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                   }
               }]
            },
            {
                test: /\.css$/,
                use: ['css-loader'],
              }
        ]
    }
};
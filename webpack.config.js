var webpack = require('webpack'),
    merge = require('webpack-merge'),
    htmlPlugin = require('html-webpack-plugin'),
    revPlugin = require('webpack-rev-replace-plugin'),
    config = require('./build.config.json'),
    path = require('path'),
    extendedDefinePlugin = require('extended-define-webpack-plugin'),
    webpackDelPlugin = require('webpack-del-plugin'),
    openBrowserPlugin = require('open-browser-webpack-plugin'),
    output = require('to-string-loader'),
    uglifyJSPlugin = require('uglifyjs-webpack-plugin');

//Note : in package.json the last variable (dev) is the param delivered to this function { env: 'dev' }. 
module.exports = function (env) {
    console.log('env configuration', env.env);
    /**
     * configPerTarget is merged with build.config.json based on the env passed
     * currently no configuration properties this not in use, keeping just in case - Ogden 4-12-2018
     */
    var configPerTarget = {
        localhost: {
        },
        development: {
        },
        test: {
        },
        staging: {
        },
        production: {
        }
    };

    // Note : '__dirname' is the root file path.
    const ROOT_DIR = path.resolve(__dirname);
    const DIST_DIR = path.join(ROOT_DIR, config.dist);

    console.log(__dirname);
    // If no env make it dev
    if (!env) {
        env = {};
        env.env = config.envDevelopment;
    }

    //merge config with env specific configPerTarget
    config = merge(config, configPerTarget[env.env]);

    console.log('env configuration', env.env);

    // this takes path variables from build.config.json and builds it with given env
    var appConfigPath = config.envs + config.appConfig.replace('{env}', env.env);


    return {
        entry: ['babel-polyfill', config.src + config.entry],//main.ts
        output: {
            path: path.resolve(__dirname, config.dist),
            filename: config.buildjs,
            sourceMapFilename: config.buildjsmap
        },
        module: {
            rules: [
                { test: /\.html$/, use: 'raw-loader' },
                { test: /\.css$/, use: 'raw-loader' },
                {
                    test: /\.ts$/,
                    loaders: [
                        'ts-loader',
                        'angular2-template-loader',
                        'angular-router-loader']
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader'],
                },
                //For images. 
                { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=app/assets/images/[name].[ext]' },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader'
                },
            ]
        },
        //https://webpack.js.org/configuration/devtool/
        //Webpack 4.4 has its own mode development and production, which are environment modes
        //do Webpack 4.4 is handling the devtool sourcemap config where in the past it was not
        //looks like we no longer have to worry about setting devtool
        //https://github.com/damianobarbati/yarsk/blob/50b6f352a13ec2e778fa8b252f915550b6132964/config/webpack.config.js#L110
        //devtool: config.devtool,
        resolve: {
            modules: [__dirname + path.sep + 'src', __dirname, 'node_modules'],
            extensions: ['.js', '.ts', '.scss', '.css']
        },
        optimization: {
            minimizer: [
                new uglifyJSPlugin({
                    uglifyOptions: {
                        output: {
                            comments: false,
                            ascii_only: true
                        }
                    }
                }),
            ]
        },
        plugins: [
            new htmlPlugin({
                template: config.src + config.index
            }),
            new revPlugin({
                cwd: config.src,
                files: '**/*.html',
                outputPageName: function (filename) {
                    return filename;
                },
                modifyReved: function (filename) {
                    return filename.replace(/(\/style\/|\/script\/)/, '')
                }
            }),
            //Makes AppConfig variable available in the application code. 
            new extendedDefinePlugin({
                AppConfig: require(appConfigPath)
            }),
            //Usefull if you need remove some files or folders before compilation processes. 
            //currently not used (no dist file).
            new webpackDelPlugin({ match: path.join(DIST_DIR, '*.*') }),
            //opens browser after compilation.
            new openBrowserPlugin({ url: 'http://localhost:8080' })
        ]
    }
}

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "popup.js",
        path: __dirname + "/dist",
    },
    devtool: "source-map",

    resolve: {
        extensions: [ ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules"
            }
        ],
    },
    externals: {},
};
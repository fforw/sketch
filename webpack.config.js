const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WatchCleanPlugin = require("./src/util/watch-clean");
const buildPath = "./dist/";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PRODUCTION = (process.env.NODE_ENV === "production");

module.exports = {
    mode: process.env.NODE_ENV,
    entry: ["./src/index.js"],
    output: {
        path: path.join(__dirname, buildPath),
        filename: "[name].[hash].js"
    },
    target: "web",
    devtool: "source-map",

    plugins: [
        new HtmlWebpackPlugin({
            inject: "body",
            template: "src/template.html"
        }),

        new MiniCssExtractPlugin({
            filename: "bundle-[name]-[chunkhash].css",
            chunkFilename: "bundle-[id]-[chunkhash].css"
        }),

        new WatchCleanPlugin({
            suffixes: [
                ".js", ".js.map",
                ".jpg",
                ".jpeg",
                ".png",
                ".gif",
                ".svg",
                ".tga",
                ".gltf",
                ".babylon",
                ".mtl",
                ".mtl",
                ".pcb",
                ".pcd",
                ".prwm",
                ".obj",
                ".mat",
                ".mp3",
                ".ogg",
                ".vert",
                ".frag",
                ".glsl",
                ".shader",
                ".txt",
                ".json"
            ]
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: path.resolve(__dirname, "./node_modules/")
            }, {
                test: /\.(jpe?g|png|gif|svg|tga|gltf|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
                use: "file-loader",
                exclude: path.resolve(__dirname, "./node_modules/")

            }, {
                type: "javascript/auto",
                test: /\.(json)/,
                exclude: path.resolve(__dirname, "./node_modules/"),
                use: [
                    {
                        loader: "file-loader"
                    }
                ],
            },
            // this is just concatenating the .css modules in components to one bundle.
            // No postprocessing of that.
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }

        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
};

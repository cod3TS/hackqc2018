const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const port = process.env.PORT || 5000;

module.exports = {
    mode: "development",
    entry: "./src/index.jsx",
    output: {
        filename: "bundle.[hash].js"
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            camelCase: true,
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            path: path.resolve(path.join(__dirname, "../../dist")),
            template: path.resolve(path.join(__dirname, "../html/index.html")),
            favicon: path.resolve(path.join(__dirname, "../html/favicon.ico"))
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devServer: {
        host: "localhost",
        port: port,
        historyApiFallback: true,
        contentBase: path.resolve(path.join(__dirname, "../../dist")),
        hot: true,
        open: true,
        progress: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        },
        proxy: {
            "/api": "http://localhost:4000"
        }
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json", ".scss", ".css"],
        modules: [path.resolve("./node_modules")],
        alias: {
            "#Actions": path.resolve(path.join(__dirname, "../actions")),
            "#App": path.resolve(path.join(__dirname, "../components/App")),
            "#Assets": path.resolve(path.join(__dirname, "../assets")),
            "#Config": path.resolve(path.join(__dirname, "./")),
            "#Components": path.resolve(path.join(__dirname, "../components")),
            "#Reducers": path.resolve(path.join(__dirname, "../reducers")),
            "#Constants": path.resolve(path.join(__dirname, "../constants"))
        }
    },
    output: {
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
        sourceMapFilename: "maps/[name].js.map",
        path: path.resolve(path.join(__dirname, "../../dist"))
    },
    node: {
        fs: "empty"
    }
};

// entry point -> output
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const isProduction = env === "production";
    return {
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname, "public", "dist"),
            filename: "bundle.js",
            publicPath: "/dist/",
        },
        module: {
            rules: [
                {
                    loader: "babel-loader",
                    test: /\.js$|jsx/,
                    exclude: /node_modules/,
                    options: "babelrc",
                },
                {
                    test: /\.s?css$/,
                    // use: ["style-loader", "css-loader", "sass-loader"],
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: { sourceMap: true },
                        },
                        {
                            loader: "sass-loader",
                            options: { sourceMap: true },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "styles.css",
            }),
        ],
        externals: {
            react: "React",
        },
        devtool: isProduction ? "source-map" : "inline-source-map",
        devServer: {
            static: {
                directory: path.join(__dirname, "public"),
            },
            compress: true,
            port: 9000,
            historyApiFallback: true,
        },
        performance: {
            hints: false,
        },
        mode: isProduction ? "production" : "development",
    };
};

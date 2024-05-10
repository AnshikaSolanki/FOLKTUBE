const path = require("path");
const ExtractCSS= require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry:  ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(scss)$/,
                use : [ExtractCSS.loader, "css-loader", "postcss-loader", "sass-loader"]
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins : [new ExtractCSS({
        filename: "styles.css",
    })]
}

module.exports = config;
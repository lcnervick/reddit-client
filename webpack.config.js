const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	// tell webpack to include a separate source-map file (inline-source-map) includes source map at end of js files
	devtool: 'source-map',
	// tell webpack where to start pulling info
	entry: path.join(__dirname, "src", "common", "index.js"),
	// tell webpack where to build to
	output: {
		filename: 'index.[contenthash].js',
		path: path.join(__dirname, "dist"),
	},
	module: {
		rules: [
			{ // tell webpack to use babel-loader module for all .js files
				test: /\.?js$/,
				exclude: /node_modules/,
				use: { 
					loader: "babel-loader",
					options: {
						// tells babel to transpile ES2015+ and ReactJS languages
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{ // tells webpack to use style-loader and css-loader for all css files
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
				]
			},
			{ // tells webpack to use file-loader for all image files
				test: /\.(png|jp(e*)g|gif)$/,
        		use: ['file-loader']
			},
			{ // tells webpack to use @svgr/webpack for all svg files
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			}
		]
	},
	plugins: [
		// tells webpack to clean up the old build files
		new CleanWebpackPlugin(),
		// tells webpack to inject the script tag into this file and move to dist folder
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'index.[contenthash].css',
		})
	]
}

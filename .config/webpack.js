/**
 * Webpack config for all environments :
 * - Standard bundling in development mode,
 * - Hot bundling in development environment eventually modified for webpack-dev-server,
 * - Production bundling.
 */

const path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const ROOT_PATH = path.resolve(__dirname, "../");

// Make config available for webpack
module.exports = (env, argv) => {

	const IS_PROD = argv.mode === "production";

	const plugins = [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./app/index.html"
		}),
		new MiniCssExtractPlugin({
			filename: "styles/cdm-base.css"
		}),
		new CopyWebpackPlugin([
			{
				from: "./app/fonts",
				to: "fonts"
			},{
				from: "./app/styles",
				to: "styles"
			},{
				from: "./app/images",
				to: "images"
			}
		])
	];
	if (IS_PROD) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return {
		devtool: IS_PROD ? "source-map"/*"cheap-module-source-map"*/ : "inline-source-map",
		entry: {
			main: "./app/main.js"
		},
		target: "web",
		output: {
			 path: path.resolve(ROOT_PATH, "./dist"),
			 filename: "[name].bundle.js",
			 publicPath: "/"
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules\/(?!(@knit*|@sky)\/)/,
					use: {
						loader: "babel-loader",
						options: {
							configFile: path.resolve(ROOT_PATH, ".config/babel.js")
						}
					}
				},{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader, // instead of style-loader,
						"css-loader"
					]
				},{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								outputPath: "images"
							}
						}
					]
				},{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								outputPath: "fonts"
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: [".js", ".jsx"]
		},
		devServer: {
			contentBase:		"app/",
			historyApiFallback:	true,
			disableHostCheck:	true,
			port:				3030,
			compress:			true,
			open:				true
		},
		optimization: {
            // Create cache bundle for invariants
            splitChunks: {
				cacheGroups: {
					react: {
						test:		/[\\/]node_modules[\\/](react|react-dom)[\\/]/,
						name:		"react",
						chunks:		"all",
					},
//                    "react-virtualized": {
//						test:		/[\\/]node_modules[\\/](react-virtualized)[\\/]/,
//						name:		"react-virtualized",
//						chunks:		"all",
//					},
				}
			},
            // Minify bundled CSS
            //minimizer: [
            //    new TerserJSPlugin({}),
            //    new OptimizeCSSAssetsPlugin({})
            //],
			// Better tree shaking for webpack
            usedExports: true
		},
		plugins
	};
};

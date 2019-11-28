const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	devtool: 'source-map',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
};

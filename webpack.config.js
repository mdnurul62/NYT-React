//var path = require("path");

module.exports = {
	entry: "./app/app.js",
	output: {
		//path: path.resolve(__dirname, "build"),
		//publicPath: "/build/",
		filename: "public/bundle.js"
	},
	//context: path.resolve(__dirname, "public"),
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: /app/,
				loader: "babel-loader",
				query: {
					presets: ["react", "es2015"]
				}
			}
		],
	// 	devServer: {
	// 		inline: true,
	// 		hot: false,
	// 		host: '0.0.0.0',
	// 		stats: {
	// 			colors: true,
	// 			progress: true
	// 		}

	// 	}
	 },
	devtool: "eval-source-map"
};
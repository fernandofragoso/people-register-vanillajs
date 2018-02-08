module.exports = {
  entry: './src/app.js',
  output: {
      filename: './dist/bundle.js'
  },
  module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader'
        }
    ]
},
};
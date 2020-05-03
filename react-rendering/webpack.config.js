module.exports = {
      target: 'node',
      entry: {
        index: './index.js'
      },
      output: {
        filename: '[name].js',
        path: __dirname + '/dist'
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
    }
  };
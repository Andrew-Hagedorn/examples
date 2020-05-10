const nodeExternals = require('webpack-node-externals');

module.exports = {
      target: 'node',
      externals: [nodeExternals()],
      entry: {
        index: './index.js',
        worker: './worker.js'
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
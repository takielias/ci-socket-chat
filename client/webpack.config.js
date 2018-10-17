const path = require('path');

module.exports = {
  entry: './custom.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  // output: {
  //   filename: '../../bundle.js'
  // },
  output: {
    path:path.join(__dirname, './../server/asset/chat'),
    filename: "bundle.js"
},
  devtool:'source-map',
  devServer: {
    contentBase: path.join(__dirname, "./"),
    compress: true,
    port: 8080
  }
  
};
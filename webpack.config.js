const path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
          test: /\.js$/,
          include: path.join(__dirname, 'src'),    //配置文件目录下的es6文件夹作为js源代码文件夹，所有源代码一定要放在该文件夹下
          exclude: '/node_modules',
          loader: 'babel-loader'
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  resolve: {
    extensions: ['*', '.js', '.json']
  }
};
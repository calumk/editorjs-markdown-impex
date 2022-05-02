const path = require('path');

module.exports = {
  entry: {
    bundle: [
      path.resolve(__dirname, 'src/markdown-impex.js'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  node: { global: true, fs: 'empty' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'editorjs-markdown-impex.bundle.js',
    libraryTarget: 'umd',
  },
  devServer: {
    index: 'index.html',
    compress: true,
    port: 8000,
  },
};

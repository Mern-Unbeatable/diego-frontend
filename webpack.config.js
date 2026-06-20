const path = require('path');
// We need webpack to handle environment variables if you want them in Webpack
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // 1. Handle React JSX with the NEW automatic transform
              ['@babel/preset-react', { runtime: 'automatic' }],
              // 2. Handle modern JavaScript features
              '@babel/preset-env'
            ]
          }
        },
      },
    ],
  },

  devtool:
    process.env.NODE_ENV === 'production'
      ? 'source-map'
      : 'cheap-module-source-map',

  devServer: {
    static: './dist',
    hot: true,
  },

  // OPTIONAL: Handle your VITE_ environment variables
  // Webpack does not read .env files like Vite does automatically.
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      // If your code uses import.meta.env.VITE_API_BASE_URL, 
      // you need to define it manually like this:
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1'),
    }),
  ],
};
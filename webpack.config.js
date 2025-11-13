const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      'sequra-widget': './src/index.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].min.js' : '[name].js',
      library: 'SeQuraWidget',
      libraryTarget: 'umd',
      libraryExport: 'default',
      globalObject: 'this',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: [
            /node_modules/,
            /stories/,    // Exclude Storybook stories
            /\.stories\.tsx?$/, // Exclude Storybook stories
            /\.test\.tsx?$/,    // Exclude test files
            /\.spec\.tsx?$/,    // Exclude spec files
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      // Copy merchant's existing files to dist
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'merchant-site/main.css',
            to: 'main.css'
          },
          {
            from: 'merchant-site/main.js',
            to: 'main.js'
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './merchant-site/product-page.html',
        filename: 'index.html',
        inject: 'body',
        chunks: ['sequra-widget'],
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'merchant-site'),
      },
      compress: true,
      port: 3000,
      hot: false,
      open: true,
      proxy: [
        {
          context: ['/credit_agreements', '/events'],
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      usedExports: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Remove all console.* calls
            },
          },
        }),
      ],
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
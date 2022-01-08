/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlInlineScriptWebpackPlugin = require('html-inline-script-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ProvidePlugin } = require('webpack')

module.exports = (env, argv) =>
  /** @type {import('webpack').Configuration} */
  ({
    mode: argv.mode === 'production' ? 'production' : 'development',
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    entry: {
      code: './src/code.ts',
      ui: './src/ui.tsx'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: true } }
          ]
        },
        {
          test: /\.(jpe?g|png|bmp|gif|webp|svg)$/,
          type: 'asset/inline'
        },
        {
          test: /\.dts$/i,
          use: 'raw-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, '.')
      }
    },
    plugins: [
      new ProvidePlugin({
        ts: 'ts'
      }),
      new HtmlWebpackPlugin({
        template: './src/ui.html',
        filename: 'ui.html',
        inject: 'body',
        inlineSource: '.(js)$',
        chunks: ['ui']
      }),
      new HtmlInlineScriptWebpackPlugin([/ui.js$/])
    ],
    externals: {
      ts: 'ts'
    }
  })

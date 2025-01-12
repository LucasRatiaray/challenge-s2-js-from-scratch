// webpack.config.cjs
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', // ou 'production' selon vos besoins
  entry: './src/ts/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './', // Chemins relatifs pour le déploiement
    clean: true, // Nettoie le dossier de sortie avant chaque build
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      "buffer": require.resolve("buffer/"),
      "process": require.resolve("process/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "vm": require.resolve("vm-browserify"),
    },
  },  
  module: {
    rules: [
      // Transpilation TypeScript
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Traitement des fichiers CSS avec PostCSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // Gestion des fichiers d'assets
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      // Gestion des fichiers HTML avec html-loader (si nécessaire)
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
  plugins: [
    // Plugin principal pour le template HTML
    new HtmlWebpackPlugin({
      template: `./public/${page}.html`,
      inject: 'body', // Injecte automatiquement les scripts
    }),    
    // Plugin pour charger les variables d'environnement
    new Dotenv(),
    // Plugin pour fournir des variables globales
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
      crypto: 'crypto-browserify',
    }),
    // Plugin pour nettoyer le dossier dist avant chaque build
    new CleanWebpackPlugin(),
    // Génère des pages HTML supplémentaires
    ...[
      'index',
      'movie',
      'serie',
      'show',
      'login'
    ].map((page) =>
      new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: `./public/${page}.html`,
        chunks: ['main'],
        favicon: `./public/assets/images/favicon.svg`,
        inject: 'body',
        minify: false
      })
    ),
    // Plugin pour copier les assets statiques
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/assets/images', to: 'assets/images' }
      ]
    })
  ],
  devtool: 'source-map', // Optionnel pour le debugging
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
    historyApiFallback: true, // Ajout important
  },  
};

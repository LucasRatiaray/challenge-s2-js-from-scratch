const path = require("path");

module.exports = {
  mode: "development", // ou 'production' en fonction de votre environnement
  entry: "./src/index.ts", // point d'entrée de votre application
  output: {
    filename: "bundle.js", // nom du fichier de sortie
    path: path.resolve(__dirname, "dist"), // dossier de sortie
  },
  resolve: {
    extensions: [".ts", ".js"], // extensions des fichiers à traiter
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // tous les fichiers se terminant par .ts
        use: "ts-loader", // utiliser ts-loader pour les traiter
        exclude: /node_modules/, // exclure le dossier node_modules
      },
    ],
  },
  devtool: "source-map", // pour faciliter le débogage
};

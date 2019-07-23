const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: [`./app.jsx`]
  },
  resolve: {
    // Make all of /src accessible with relative imports from anywhere! Spuper useful! e.g.
    // import bar from 'foo/bar' ==> /src/foo/bar
    modules: [`node_modules`, `src`],
    extensions: [`.js`, `.jsx`]
  },
  watch: true,
  output: {
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [
            [
              "@babel/preset-env",
              { targets: { browsers: ["> 1%", "ie >= 10"] } }
            ]
          ],
          plugins: ["babel-plugin-syntax-jsx", "inferno"]
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};

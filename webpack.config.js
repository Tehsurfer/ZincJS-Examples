var path = require('path');

module.exports = {
  mode: "none",
  entry: {
    "index": "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "[name].js",
    library: 'main',
    libraryTarget: 'umd',
    globalObject: 'this',
  }
};

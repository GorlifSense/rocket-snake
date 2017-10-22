const path = require('path');

module.exports = {
    entry: './public/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js')
    },
    module: {
     rules: [
       {
         test: /\.css|\.scss$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       }
     ]
   }
};

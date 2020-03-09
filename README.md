# TypeScript-Babel-Webpack-Server
Ready to use development [webpack](https://webpack.js.org/ "webpack") server with hot-reloading and support for [TypeScript](https://www.typescriptlang.org/ "TypeScript") and [Babel](https://babeljs.io/ "Babel").

## Getting started
1. Clone repository
`$ git clone https://github.com/tomcolaa/typescript-babel-webpack-server.git`

2. Open repository
`$ cd typescript-babel-webpack-server`

3. Install
`$ npm install`

## How to use it
1. Local web server
`$ npm start`

2. Public server
`$ npm run-script build`
This command will generate a build folder that you can upload to your server.

## How this code base created
### 1. npm install
Run the following comand:
`$ npm install --save-dev typescript @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-typescript webpack webpack-cli babel-loader file-loader style-loader css-loader webpack-dev-server clean-webpack-plugin`

### 2. npm init typescript
Run the following comand:
`$ npm init
tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir lib`

### 3. Create .babelrc
Create .babelrc in the root of your project folder and add the following code:
```
{
    "presets": [
        "@babel/env",
        "@babel/typescript"
    ],
    "plugins": [
        "@babel/proposal-class-properties"
    ]
}
```

### 4. Create webpack.config.js
Create webpack.config.js in the root of your project folder and add the following code:
```javascript
var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // Change to your "entry-point".
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
          {
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              'file-loader',
            ],
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ],
          }
        ],
    },
    devServer: {
      contentBase: './src'
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
};
```

### 5. Change scripts in package.json
Change the scripts in package.json to the following code:
```
"scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "build": "webpack && cp src/index.html build/index.html",
    "build:types": "tsc --emitDeclarationOnly",
    "build:js": "babel src --out-dir lib --extensions \".ts,.tsx\" --source-maps inline",
    "bundle": "webpack",
    "start": "webpack-dev-server"
}
```

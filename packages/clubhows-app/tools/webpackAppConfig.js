const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const getClientEnvironment = require('../config/env');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);
// App-specific back-end Webpack config should be here
const envar = {
  output: {
    publicPath: publicPath
  },
  plugins: [new InterpolateHtmlPlugin(env.raw)],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
// App-specific back-end Webpack config should be here
const server = {
  resolve: {
    extensions: ['.js', '.scss', '.css', '.json']
  },
  plugins: [new InterpolateHtmlPlugin(env.raw)],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          }
        ]
      }
    ]
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};

// App-specific web front-end Webpack config should be here
const web = {
  resolve: {
    extensions: ['.js', '.scss', '.css', '.json']
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules', './node_modules/grommet/node_modules']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};

// App-specific Android React Native front-end Webpack config should be here
const android = {
  //  entry: {
  //    'index.mobile.bundle': [
  //      require.resolve('./react-native-polyfill.js'),
  //      './src/mobile/index.js'
  //    ]
  //  }
};

// App-specific iOS React Native front-end Webpack config should be here
const ios = {
  //  entry: {
  //    'index.mobile.bundle': [
  //      require.resolve('./react-native-polyfill.js'),
  //      './src/mobile/index.js'
  //    ]
  //  }
};

const dependencyPlatforms = {
  'apollo-engine': 'server',
  bcryptjs: 'server',
  'body-parser': 'server',
  dataloader: 'server',
  expo: ['ios', 'android'],
  express: 'server',
  'apollo-server-express': 'server',
  'apollo-upload-server': 'server',
  'graphql-subscriptions': 'server',
  'graphql-tools': 'server',
  grommet: 'web',
  history: 'web',
  humps: 'server',
  'immutability-helper': ['ios', 'android', 'web'],
  'isomorphic-fetch': 'server',
  jsonwebtoken: 'server',
  'jwt-decode': 'web',
  knex: 'server',
  mysql2: 'server',
  nodemailer: 'server',
  persistgraphql: ['server', 'web'],
  'performance-now': 'server',
  pg: 'server',
  'react-cookie': ['server', 'web'],
  'react-dom': 'web',
  'react-dropzone': 'web',
  'react-ga': 'web',
  'react-helmet': 'web',
  'react-hot-loader': 'web',
  'react-native': ['ios', 'android'],
  'react-native-web': 'web',
  'react-navigation': ['ios', 'android'],
  'react-redux': 'web',
  'react-router': 'web',
  'react-router-dom': 'web',
  'react-router-redux': 'web',
  'react-transition-group': 'web',
  reactstrap: 'web',
  'redux-devtools-extension': 'web',
  'redux-form': 'web',
  'serialize-javascript': 'server',
  'source-map-support': 'server',
  sqlite3: 'server',
  'styled-components': ['server', 'web'],
  'subscriptions-transport-ws': ['ios', 'android', 'web'],
  'universal-cookie-express': 'server',
  '@expo/vector-icons': ['ios', 'android']
};

module.exports = { server, web, android, ios, dependencyPlatforms, envar };

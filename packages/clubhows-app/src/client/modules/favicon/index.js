// Require all files from assets dir recursively addding them into assets.json
let req = require.context('!file-loader?name=[name].[ext]!./assets', true, /.*/);
req.keys().map(req);

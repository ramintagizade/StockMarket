var express = require("express");
var path = require("path");
var compression = require("compression");
var favicon  = require("serve-favicon");
var webpack  =  require("webpack");
var webpackMiddleware =  require("webpack-dev-middleware");
var webpackHotMiddleware  = require ("webpack-hot-middleware");
var config  =  require("./webpack.config.js");
//var api = require("./api");
var bodyParser = require("body-parser");


var isDevelopment = process.env.NODE_ENV !== 'production';
var port = isDevelopment ? 3000 : process.env.PORT;
var app = express();

app.use(favicon(path.join(__dirname,'dist','favicon.ico')));
app.use(compression());
app.use(bodyParser.json());

//app.use('/', api());

if (isDevelopment) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });

} 
else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Server Listens on port .', port);
});
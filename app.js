var express = require( 'express' ),
    path = require( 'path' ),
    logger = require( 'morgan' ),
    cookieParser = require( 'cookie-parser' ),
    bodyParser = require( 'body-parser' ),
    routes_api = require( './routes/api' ),
    app = express()
;
app.use( logger( 'dev' ) )
;
app.use( bodyParser.json() )
;
app.use( bodyParser.urlencoded( {
  extended: false
} ) )
;
app.use( cookieParser() )
;
app.use( '/', routes_api )
; // catch 404 and forward to error handler
app.use( function( req, res, next ) {
  var err = new Error( 'Not Found' )
  ;
  err.status = 404
  ;
  next( err )
} )
; // error handlers
// dev error handler, will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
  app.use( function( err, req, res, next ) {
    res.status( err.status || 500 )
    ;
    res.send( {
      message: err.message,
      error: err
    } )
  } )
}
// prod error handler, no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status( err.status || 500 )
    ;
    res.send( {
      message: err.message,
      error: {}
    } )
} )
;
module.exports = app
;

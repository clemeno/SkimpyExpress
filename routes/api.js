var express = require( 'express' ),
    router = express.Router()
;
router.route( '/rest/api/action' )
  .get( function( req, res, next ) {
    res.send( {
        method: 'GET',
        route: '/rest/api/action'
    } )
  } )
  .post( function( req, res, next ) {
    res.send( {
        method: 'POST',
        route: '/rest/api/action'
    } )
  } )
;
module.exports = router
;

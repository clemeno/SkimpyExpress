var express = require( 'express' ),
    cassandraDrv = require( 'cassandra-driver' ),
    // use a default Cli to a fresh Cassandra demo. Test Cluster
    // using custom arbitrary keyspace
    cassandraCli = new cassandraDrv.Client( {
      contactPoints: [ '127.0.0.1' ],
      keyspace: 'terminaltransactionkeys001'
    } ),
    router = express.Router()
; // custom REST route for our API
router.route( '/rest/api/transaction' )
  .get( function( req, res, next ) {
    // READ all data from a table `transactions`
    cassandraCli.execute( ' SELECT * FROM transactions ', function( error, result ) {
      // sending a consistant structure in this code
      // but ( void 0 ) placeholders will disable irrelevant entries at runtime
      if ( !error ) {
        res.send( {
          method: 'GET',
          route: '/rest/api/transaction',
          action: 'READ',
          result: result,
          error: void 0
        } )
      } else {
        res.send( {
          method: 'GET',
          route: '/rest/api/transaction',
          action: 'READ',
          result: void 0,
          error: error
        } )
      }
    } )
  } )
  .post( function( req, res, next ) {
    // TODO
    res.send( {
      method: 'POST',
      route: '/rest/api/transaction',
      action: 'CREATE',
      result: void 0,
      error: void 0
    } )
  } )
;
module.exports = router
;

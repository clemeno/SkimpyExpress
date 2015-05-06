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
    res.header( 'Access-Control-Allow-Origin', '*' )
    ; // READ all data from a table `transactions`
    cassandraCli.execute( ' SELECT * FROM transactions ', function( error, result ) {
      // sending a consistant structure in this code
      // but ( void 0 ) placeholders will disable irrelevant entries at runtime
      if ( !error ) {
        res.send( {
          method: 'GET',
          route: '/rest/api/transaction',
          action: 'READ success',
          result: result,
          error: void 0
        } )
      } else {
        res.send( {
          method: 'GET',
          route: '/rest/api/transaction',
          action: 'READ fail',
          result: void 0,
          error: error
        } )
      }
    } )
  } )
  .post( function( req, res, next ) {
    res.header( 'Access-Control-Allow-Origin', '*' )
    ;
    cassandraCli.execute(
        ' INSERT INTO transactions '
      + ' ( id, card_balance, card_serial, card_type, terminal_serial, transaction_amount, transaction_result, transaction_timestamp, transaction_type ) '
      + ' VALUES '
      + ' ( uuid(), ?, ?, ?, ?, ?, ?, ?, ? ) ',
      [
        ( 1 * req.body.cardbalance ),
        ( '' + req.body.cardserial ),
        ( 1 * req.body.cardtype ),
        ( '' + req.body.terminalserial ),
        ( 1 * req.body.transactionamount ),
        ( 1 * req.body.transactionresult ),
        ( 1 * req.body.transactiontimestamp ),
        ( 1 * req.body.transactiontype )
      ],
      {
        hints : [
          'bigint',
          'varchar',
          'int',
          'varchar',
          'bigint',
          'int',
          'bigint',
          'int'
        ]
      },
      function( error ) {
        if ( !error ) {
          res.send( {
            method: 'POST',
            route: '/rest/api/transaction',
            action: 'CREATE success',
            result: req.body,
            error: void 0
          } )
        } else {
          res.send( {
            method: 'POST',
            route: '/rest/api/transaction',
            action: 'CREATE fail',
            result: req.body,
            error: error
          } )
        }
      }
    )
  } )
;
module.exports = router
;

var express = require( 'express' ),
    mysqlDrv = require( 'mysql' ),
    mysqlCli = mysqlDrv.createConnection( {
      host: 'localhost',
      user: 'root',
      password: 'azerty',
      database: 'terminaltransactions001',
      stringifyObjects: true,
      supportBigNumbers: true,
      bigNumberStrings: true
    } ),
    router = express.Router()
;
router.route( '/rest/api/transaction' )
  .get( function( req, res, next ) {
    res.header( 'Access-Control-Allow-Origin', '*' )
    ;
    try {
      mysqlCli.query( " SELECT * from transactions ", function( error, rows, fields ) {
        if ( error ) {
          res.send( {
            method: 'GET',
            route: '/rest/api/transaction',
            action: 'READ fail',
            result: void 0,
            error: error
          } )
        } else {
          res.send( {
            method: 'GET',
            route: '/rest/api/transaction',
            action: 'READ success',
            result: rows,
            error: void 0
          } )
        }
      } )
    } catch ( exception ) {
      res.send( {
        method: 'GET',
        route: '/rest/api/transaction',
        action: 'READ fail',
        result: void 0,
        error: exception
      } )
    }
  } )
  .post( function( req, res, next ) {
    res.header( 'Access-Control-Allow-Origin', '*' )
    ; // INSERT INTO `transactions` VALUES ( '16500', 57436658676587645', '1', '11310', '300', '0', '1524', '4' );
    try {
      mysqlCli.query( " INSERT INTO transactions SET id=?, card_balance=?, card_serial=?, card_type=?, terminal_serial=?, transaction_amount=?, transaction_result=?, transaction_timestamp=?, transaction_type=? ", [
        null,
        req.body.cardbalance,
        req.body.cardserial,
        req.body.cardtype,
        req.body.terminalserial,
        req.body.transactionamount,
        req.body.transactionresult,
        req.body.transactiontimestamp,
        req.body.transactiontype
      ], function( error, result ) {
        if ( error ) {
          res.send( {
            method: 'POST',
            route: '/rest/api/transaction',
            action: 'CREATE fail',
            result: result,
            error: error
          } )
        } else {
          res.send( {
            method: 'POST',
            route: '/rest/api/transaction',
            action: 'CREATE success',
            result: result,
            error: void 0
          } )
        }
      } )
    } catch ( exception ) {
      res.send( {
        method: 'POST',
        route: '/rest/api/transaction',
        action: 'CREATE fail',
        result: void 0,
        error: exception
      } )
    }
  } )
;
module.exports = router
;

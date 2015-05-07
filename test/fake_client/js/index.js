$( document ).ready( function() {
  var socket = io( 'http://localhost:1337' )
  ;
  socket.on( 'welcome_package', function( data ) {
    if ( !data.error ) {
      var JSON_body = JSON.parse( data.body );
      if ( !JSON_body.error ) {
        JSON_body.result.rows.forEach( function( transaction ) {
          $(
              ' <div class="card-panel"> '
            +   ' <h5>Transaction #' + ( transaction.id ) + '</h5> '
            +   ' <div class="row"> '
            +     ' <div class="col s4"> '
            +       ' <div><strong>Transaction</strong></div> '
            +       ' <div>Amount: ' + ( ( ( 1 * transaction.transaction_amount ) / 100 ).toFixed( 2 ) ) + '</div> '
            +       ' <div>Result: <strong>' + ( transaction.transaction_result || '<span class="green-text">Success</span>' ) + '</strong></div> '
            +       ' <div>Timestamp: ' + ( transaction.transaction_timestamp ) + '</div> '
            +       ' <div>Type: ' + ( transaction.transaction_type ) + '</div> '
            +     ' </div> '
            +     ' <div class="col s4"> '
            +       ' <div><strong>Card</strong></div> '
            +       ' <div>Balance: ' + ( ( ( 1 * transaction.card_balance ) / 100 ).toFixed( 2 ) ) + '</div> '
            +       ' <div>Serial: </div>'
            +       ' <div>&nbsp;<strong>' + ( transaction.card_serial ) + '</strong></div> '
            +       ' <div>Type: ' + ( transaction.card_type ) + '</div> '
            +     ' </div> '
            +     ' <div class="col s4"> '
            +       ' <div><strong>Terminal</strong></div> '
            +       ' <div>Serial: </div> '
            +       ' <div>&nbsp;<strong>' + ( transaction.terminal_serial ) + '</strong></div> '
            +     ' </div> '
            +   ' </div> '
            + ' </div> '
          ).prependTo( '.transaction-list-container' )
        } )
      }
    }
  } )
  ;
  // $.ajax( {
  //   'url': 'http://localhost:1337/rest/api/transaction',
  //   'type': 'GET'
  // } ).done( function( res ) {
  //   if ( res ) {
  //     if ( res.result && res.result.rows ) {
  //       console.log( res.result.rows )
  //     } else if ( res.error ) {
  //       console.log( res.error )
  //     }
  //   }
  // } )
  // ;
  $( '.virtual-transaction-action-add' ).on( 'click', function( event ) {
    $.ajax( {
      'url': 'http://localhost:1337/rest/api/transaction',
      'type': 'POST',
      'data': $( '.virtual-transaction-parameters-form' ).serialize()
    } ).done( function( res ) {
      if ( res ) {
        console.log( res )
      }
    } )
  } )
} )

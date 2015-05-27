var generate = {
  html: {
    transaction: {
      paper: function( id, card_balance, card_serial, card_type, terminal_serial, transaction_amount, transaction_result, transaction_timestamp, transaction_type ) {
        return (
            ' <div class="card-panel"> '
          +   ' <h5>Transaction #' + id + '</h5> '
          +   ' <div class="rack"> '
          +     ' <div class="rackable" style="width:160px"> '
          +       ' <div style="padding-left:0.6rem"><strong>Transaction</strong></div> '
          +       ' <div>Amount: ' + ( ( 1 * transaction_amount ) / 100 ).toFixed( 2 ) + '</div> '
          +       ' <div>Result: <strong>' + ( transaction_result || '<span class="teal-text">Success</span>' ) + '</strong></div> '
          +       ' <div>Timestamp: ' + transaction_timestamp + '</div> '
          +       ' <div>Type: <strong class="teal-text">' + ( function() {
            if ( ( 1 * transaction_type ) === 4 ) {
              return 'Debit'
            }
            return transaction_type
          } )() + '</strong></div> '
          +     ' </div> '
          +     ' <div class="rackable" style="width:220px"> '
          +       ' <div style="padding-left:0.6rem"><strong>Card</strong></div> '
          +       ' <div>Balance: ' + ( ( 1 * card_balance ) / 100 ).toFixed( 2 ) + '</div> '
          +       ' <div>Serial: <strong class="teal-text">' + card_serial + '</strong></div> '
          +       ' <div>Type: ' + card_type + '</div> '
          +     ' </div> '
          +     ' <div class="rackable" style="width:120px"> '
          +       ' <div style="padding-left:0.6rem"><strong>Terminal</strong></div> '
          +       ' <div>Serial: <strong class="teal-text">' + terminal_serial + '</strong></div> '
          +     ' </div> '
          +   ' </div> '
          + ' </div> '
        )
      }
    }
  }
}
$( document ).ready( function() {
  var socket = io( 'http://localhost:1337' )
  ;
  socket.on( 'welcome_package', function( data ) {
    if ( !data.error ) {
      var JSON_body = JSON.parse( data.body )
      ;
      if ( !JSON_body.error ) {
        $( '.transaction-list-container' ).html( '' )
        ;
        JSON_body.result.forEach( function( transaction ) {
          $( generate.html.transaction.paper(
            transaction.id,
            transaction.card_balance,
            transaction.card_serial,
            transaction.card_type,
            transaction.terminal_serial,
            transaction.transaction_amount,
            transaction.transaction_result,
            transaction.transaction_timestamp,
            transaction.transaction_type
          ) ).hide().prependTo( '.transaction-list-container' ).slideDown( 400 )
        } )
      }
    }
  } )
  ;
  $( '.virtual-transaction-action-add' ).on( 'click', function( event ) {
    var JQ_form_add_transaction = $( '.virtual-transaction-parameters-form' )
      JQ_input_cache = {
      cardbalance: JQ_form_add_transaction.find( '#cardbalance' ).val(),
      cardserial: JQ_form_add_transaction.find( '#cardserial' ).val(),
      cardtype: JQ_form_add_transaction.find( '#cardtype' ).val(),
      terminalserial: JQ_form_add_transaction.find( '#terminalserial' ).val(),
      transactionamount: JQ_form_add_transaction.find( '#transactionamount' ).val(),
      transactionresult: JQ_form_add_transaction.find( '#transactionresult' ).val(),
      transactiontimestamp: JQ_form_add_transaction.find( '#transactiontimestamp' ).val(),
      transactiontype: JQ_form_add_transaction.find( '#transactiontype' ).val()
    }
    ;
    $.ajax( {
      'url': 'http://localhost:1337/rest/api/transaction',
      'type': 'POST',
      'data': $( '.virtual-transaction-parameters-form' ).serialize()
    } ).done( function( res ) {
      if ( res && !res.error ) {
        $( generate.html.transaction.paper(
          res.result.insertId,
          JQ_input_cache.cardbalance,
          JQ_input_cache.cardserial,
          JQ_input_cache.cardtype,
          JQ_input_cache.terminalserial,
          JQ_input_cache.transactionamount,
          JQ_input_cache.transactionresult,
          JQ_input_cache.transactiontimestamp,
          JQ_input_cache.transactiontype
        ) ).hide().prependTo( '.transaction-list-container' ).slideDown( 400 )
      }
    } )
  } )
} )

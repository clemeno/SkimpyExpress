$( document ).ready( function() {
  $.ajax( {
    'url': 'http://localhost:1337/rest/api/transaction',
    'type': 'GET'
  } ).done( function( res ) {
    if ( res ) {
      if ( res.result && res.result.rows ) {
        console.log( res.result.rows )
      } else if ( res.error ) {
        console.log( res.error )
      }
    }
  } )
  ;
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

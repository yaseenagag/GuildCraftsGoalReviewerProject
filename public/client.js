$(function(){

  $('body').text('client.js is here at '+location.pathname)


  $.getJSON('/api/profile', function(data){
    if (data.error && data.error == "not logged in"){
      location.replace(data.loginURI)
    }
    $('body').text(JSON.stringify(data));
  });

})



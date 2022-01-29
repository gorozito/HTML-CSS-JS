$(document).ready(function() {
  var forismaticURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?"
  var msg = "";
  var author = "";
  var textTweet = "";
  var twtLink = "";
  $("#getQuote").on("click", function() { 
    $.getJSON(forismaticURL, function(data) {
          msg = data.quoteText;
          author = data.quoteAuthor;
          $(".message").html(msg);
          if (author.length == 0)
            author = "Anonymous";
          $(".author").html("'" + author+ "'");
    });
  });
  
  $('#sendTweet').click(function() {
    if (msg.length > 0 && msg.length < 280) {
      twtLink = "https://twitter.com/intent/tweet?text=" + msg + "   Author: " + author;
    window.open(twtLink,'_blank');
    }
  });
});
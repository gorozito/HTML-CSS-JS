function build_wiki_search_url(pattern) {
    var base_url = "https://en.wikipedia.org/w/api.php";
    var format = "&format=json";
    var request_url = "?action=query&format=json&list=search&srsearch=";
    var url = base_url + request_url + pattern;
    return url;
}
function procesarContent(titulo, resumen, url) {
   $('#display-result').append('<li>'+'<h2>'+titulo+'</h2>'+'<a href="https://en.wikipedia.org/?curid='+url+'" target="_blank">'+resumen+'</a>'+'</li>');
}

function processResult(apiResult){
     for (var i = 0; i < apiResult.query.search.length; i++){
       procesarContent(apiResult.query.search[i].title, apiResult.query.search[i].snippet, apiResult.query.search[i].pageid);
     }
  }

$(document).ready(function() {
  
    $("#doitRandom").click(function(e) {window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');});
    $("#doit").click(function(e) {
        $("#display-result").empty();
        e.preventDefault();
        console.log("Submit button clicked");
        var pattern = $("#search").val();
        var url = build_wiki_search_url(pattern);
        $.ajax( {
            type: "GET",
            url: url,
            //data: querydata,
            dataType: 'jsonp',
            success: function(data) {
              data.query.search.forEach(function (item) {
        console.log(item);
      });
                processResult(data);
            },
            error: function(errorMessage) {
                 console.log("damnn");
              }
        });
    });
})
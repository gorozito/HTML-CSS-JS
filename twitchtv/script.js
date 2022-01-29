function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

function search() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function extraerName(name) {
  var array = name.split("/");
  return array[array.length - 1];
}

$(document).ready(function() {
  
  var online = false, offline = false; 
  var streamers=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "RobotCaleb", "noobs2ninjas", "storbeck", "habathcx", "shroud", "drDisrespectLIVE"];

  var urlUsers="https://wind-bow.gomix.me/twitch-api/users/";
  var urlStreams="https://wind-bow.gomix.me/twitch-api/streams/";
  var urlChannels="https://wind-bow.gomix.me/twitch-api/channels/";
  var direccion = "https://www.twitch.tv/";
  
  function agregarItem(data, isOnline) {
    if (isOnline) {
      //console.log(data);
      $("#myUL").append('<li><a href="' + data.stream.channel.url + '" target = "_blank">'+'<p class = "titOnline"><img class = "logo" src="'+data.stream.channel.logo+'">'+'  '+data.stream.channel.display_name+'</img></p><p class = "descripcion"> Game: '+data.stream.game+'  - Stream type: '+data.stream.stream_type+'  - Viewers: '+data.stream.viewers+'</p></a></li>');
      
    }
    else {
      console.log(data);
      $("#myUL").append('<li><a href="' + direccion + extraerName(data._links.self) + '" target = "_blank">'+'<p class = "titOffline">'+extraerName(data._links.self)+'</p></a></li>');
      
    }
    
  }
  
  
  function tratarStreams() {
   
    $("#myUL").empty();
    for (var i=0; i<streamers.length; i++) {
      $.ajax({
      type:'GET',
      dataType:'json',
      async:false,
      url:urlStreams+streamers[i]+"?callback=?",
      success: function(data) {
        if (data.stream!==null && online) { 
          agregarItem(data, true);
        }
        else if (data.stream === null && offline) {
          agregarItem(data, false);
        }
      },
      error: function(errorMessage) { alert("damnn"); }});
    }
  };
  
  $("#all").click(function(e) {
    online = true; offline = true;
    tratarStreams();
  });
                  
  $("#online").click(function(e) {
    offline = false; online = true;
    tratarStreams();
  });
                  
  $("#offline").click(function(e) {
    offline = true; online = false;
    tratarStreams();
  });
});



/*
          $.ajax({
            type:'GET',
            dataType:'json',
            async:false,
            url:urlChannels+streamers[i]+"?callback=?",
            success: function(data2) { 
              agregarItem(data2, false);
            },
            error: function(errorMessage) { alert("damnn");} 
          });*/
          //alert(i);
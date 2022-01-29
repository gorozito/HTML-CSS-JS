$(document).ready(function() {
  
  var farenheit = false; 
  var grados = 0;
  
  var getDireccion = function(grados) { 
    if (grados >= 337.5 && grados < 22.5) return "N";
    if (grados >= 22.5 && grados < 67.5) return "NE";
    if (grados >= 67.5 && grados < 112.5) return "E";
    if (grados >= 112.5 && grados < 157.5) return "SE";
    if (grados >= 157.5 && grados < 202.5) return "S";
    if (grados >= 202.5 && grados < 247.5) return "SW";
    if (grados >= 247.5 && grados < 292.5) return "W";
    if (grados >= 292.5 && grados < 337.5) return "NW";
  };
  
  var getCelsius = function(farenheit) { return Math.round(((farenheit-32)/1.8) * 100) / 100; };
  var getFarenheit = function(celsius) { return Math.round((celsius*1.8+32) * 100) / 100; };
    
  if (navigator.geolocation) {
    var lat = 0, long = 0, url = "";
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
    
    $.getJSON(url, function(data) {
        $("#icono").prepend("<img id='theImg' src='" + data.weather[0].icon + "'></img>");
        grados = data.main.temp;
        $("#cf").html("Temperature: " + data.main.temp + "º C");
        $("#city").html("City: " + data.name);
        $("#presion").html("Pressure: " + data.main.pressure + " hPa");
        $("#humedad").html("Humidity: " + data.main.humidity + " %");
        $("#viento").html("Wind speed: " + data.wind.speed + " km/h");
        $("#direccion").html("Wind direction: " + getDireccion(data.wind.deg));
      
        switch(data.weather[0].description) {
          case 'Drizzle':
          $('body').css("background-image", "url(http://cloud-maven.com/wp-content/uploads/2014/11/DSC_0061.jpg)");
          break;
          
          case 'Clouds':
          $('body').css("background-image", "url(http://www.pd4pic.com/images/sky-blue-cloud-cloudy-background-weather-sunny.jpg)");
          break;
      
          case 'Rain':
          $('body').css("background-image", "url(https://wallpaperscraft.com/image/rain_drops_splashes_heavy_rain_dullness_bad_weather_60638_3840x2400.jpg)");
          break;
      
          case 'Snow':
          $('body').css("background-image", "url(https://www.walldevil.com/wallpapers/a52/snow-wallpaper-scene-nature-weather-scenery-albums.jpg)");
          break;
      
          case 'Clear':
          $('body').css("background-image", "url(http://cache3.asset-cache.net/xd/479233488.jpg?v=1&c=IWSAsset&k=2&d=62CA815BFB1CE480904DC2BDF8D84279DD9BE2D9A1DB104C6FCD593B398CCC9B4C7E1CCD6B915F7E)");
          break;
      
          case 'Thunderstom':
        $('body').css("background-image", "url(https://s-media-cache-ak0.pinimg.com/564x/7e/fb/1e/7efb1e6d25184aac0998fb966732325d.jpg)");
          break;
          
          default:
          $('body').css("background-image", "url(http://exchangedownloads.smarttech.com/public/content/c7/c7b7d2f6-0e68-41bc-b320-063ae2783f69/previews/medium/0001.png)");
          break;
    }
      
    });    
    $("#toggle").on("click", function() { 
      if (!farenheit) {
        farenheit = true; 
        $("#toggle").html("<button class='w3-button w3-large w3-circle w3-red w3-card-4'>Toggle Celsius</button>");
        grados = getFarenheit(grados);
        $("#cf").html("Temperature: " + grados + "º F");
      }
      else {
        farenheit = false; 
        $("#toggle").html("<button class='w3-button w3-large w3-circle w3-red w3-card-4'>Toggle Farenheit</button>");
        grados = getCelsius(grados);
        $("#cf").html("Temperature: " + grados + "º C");
      }});
      
      
    });
    
    
 }});
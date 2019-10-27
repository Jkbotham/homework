
$(document).ready(function () {

        var cityName = "";
        var searchVar = encodeURI(cityName);
        var weatherURL = "https://chriscastle.com/proxy/index.php?:proxy:https://api.openweathermap.org/data/2.5/";
        var nowWeather = "weather?q=";
        var hourlyWeather = "";
        var fiveDayWeather = "forecast?q=";
        var apiKey = "ffb6baedd502c2b85f5529aeaf64b272";
        var todaysWeather = "";
        var units = "&units=Imperial"
        var today = moment().format("YYYY/MM/DD");
        // var d = 1;
        // var dayPlusForecast = moment().add(d,'days').format('YYYY-MM-DD') + " 15:00:00"
        
        // http://app.ticketmaster.com/discovery/v2/events.json?&keyword=Minnesota%20Vikings&apikey=uc6FKMGBBMGcsjNBIjHKvpNkXv2pkFhd&startDateTime=2019-10-23T18:00:00Z&sort=date,asc
        
$(".subBtn").on("click", function() {
    event.preventDefault();
    cityName = $("#userImput").val();
    callWeather();
    callWeatherForcast();
    console.log($("#userImput").val());
    console.log(todaysWeather);
    $(".unhide").removeAttr("style")
});

 function forcastLoop(){
        var z = 1;
     for  (i = 0; i < 40; i++) {
        var dayPlusForecast = moment().add(z,'days').format('YYYY-MM-DD') + " 15:00:00"
         if (dayPlusForecast === hourlyWeather.list[i].dt_txt) {
             $(".dateDay" + z).text(moment().add(z,'days').format('DD/MM/YYYY'));
             $(".tempDay" + z).text("Temp: " + hourlyWeather.list[i].main.temp + "°F")
             $(".humidityDay" + z).text("Humidity: " + hourlyWeather.list[i].main.humidity + "%")
             $(".iconDay" + z).attr("src","http://openweathermap.org/img/wn/" + hourlyWeather.list[i].weather[0].icon + "@2x.png")
             $(".iconDay" + z).attr("alt",hourlyWeather.list[i].description)

            z++;
         }
     };
 };


        function callWeather() {
        $.ajax({
            type: "GET",
            url: weatherURL + nowWeather + cityName + "&APPID=" + apiKey + units,
            dataType: "json",
            success: function(response) {
                console.log(response);
                $(".location").text(response.name)
                $("#weatherIcon").attr("src","http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
                $("#weatherIcon").attr("alt",response.weather[0].description)
                $(".todayTemp").text("Temperature: " + response.main.temp + "°F")
                $(".todayHumidity").text("Humidity: " + response.main.humidity + "%")
                $(".todayWind").text("Wind Speed: " + response.wind.speed + " MPH")
                // $(".todayUV").text("UV Index: " + response.main.temp) Need to set another ajax's call for this 
            },
            error: function(err) {
                console.log(err);
                console.log("No");
            }
        });
}

    function callWeatherForcast() {
        $.ajax({
            type: "GET",
            url: weatherURL + fiveDayWeather + cityName + "&APPID=" + apiKey + units,
            dataType: "json",
            success: function(responseFive) {
                console.log(responseFive);
                hourlyWeather = responseFive;
                forcastLoop();
                console.log(moment().add(10,'days').format('YYYY-MM-DD') + " 00:00:00");
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
});


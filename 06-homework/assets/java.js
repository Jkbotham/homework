
$(document).ready(function () {

    var cityName = "";
    var weatherURL = "https://chriscastle.com/proxy/index.php?:proxy:https://api.openweathermap.org/data/2.5/";
    var nowWeather = "weather?q=";
    var hourlyWeather = "";
    var fiveDayWeather = "forecast?q=";
    var uvIndexsearch = "uvi?"
    var apiKey = "ffb6baedd502c2b85f5529aeaf64b272";
    var todaysWeather = "";
    var units = "&units=Imperial"
    var nowWeatherResponse = "";
    var retrievedData = [];
    if (localStorage.getItem("prevSearh") === null) {
        retrievedData = []
    }
    else {
        retrievedDataGet = localStorage.getItem("prevSearh");
        retrievedData = JSON.parse(retrievedDataGet)
        writePreviousSearche()
    };

    console.log(retrievedData);

    $(".subBtn").on("click", function () {
        event.preventDefault();
        cityName = $("#userImput").val();
        callWeather();
        callWeatherForcast();
        console.log($("#userImput").val());
        $(".unhide").removeAttr("style")
        retrievedData.push(cityName)
        localStorage.setItem("prevSearh", JSON.stringify(retrievedData));
        var newList = $("<li>")
        newList.attr("class", "list-group-item list-group-item-action savedCity");
        newList.text(cityName);
        $(".list-group").prepend(newList);

    });

    $("li").on("click", function () {
        cityName = $(this).text()
        callWeather();
        callWeatherForcast();

        var newList = $("<li>")
        newList.attr("class", "list-group-item list-group-item-action savedCity");
        newList.text(cityName);
        $(".list-group").prepend(newList);

        retrievedDataGet = localStorage.getItem("prevSearh");
        retrievedData = JSON.parse(retrievedDataGet)

        for (i = 0; i < retrievedData.length; i++) {
            if ($(this).text() === retrievedData[i])
                retrievedData.splice(i, 1);
        }

        retrievedData.push($(this).text())
        localStorage.setItem("prevSearh", JSON.stringify(retrievedData));
        $(this).remove();
    })

    function writePreviousSearche() {
        i = retrievedData.length - 1;
        cityName = retrievedData[i];
        $(".unhide").removeAttr("style")
        callWeather();
        callWeatherForcast();
        for (z = 0; z < retrievedData.length; z++) {
            var newList = $("<li>")
            newList.attr("class", "list-group-item list-group-item-action savedCity");
            newList.attr("data-bullshit", retrievedData[z]);
            newList.text(retrievedData[z]);
            $(".list-group").prepend(newList);
        }

    }

    function forcastLoop() {
        var z = 1;
        for (i = 0; i < 40; i++) {
            var dayPlusForecast = moment().add(z, 'days').format('YYYY-MM-DD') + " 15:00:00"
            if (dayPlusForecast === hourlyWeather.list[i].dt_txt) {
                $(".dateDay" + z).text(moment().add(z, 'days').format('DD/MM/YYYY'));
                $(".tempDay" + z).text("Temp: " + hourlyWeather.list[i].main.temp + "°F")
                $(".humidityDay" + z).text("Humidity: " + hourlyWeather.list[i].main.humidity + "%")
                $(".iconDay" + z).attr("src", "http://openweathermap.org/img/wn/" + hourlyWeather.list[i].weather[0].icon + "@2x.png")
                $(".iconDay" + z).attr("alt", hourlyWeather.list[i].description)
                z++;
            }
        };
    };

    function callUVindex() {
        $.ajax({
            type: "GET",
            url: weatherURL + uvIndexsearch + "&APPID=" + apiKey + "&lat=" + nowWeatherResponse.coord.lat + "&lon=" + nowWeatherResponse.coord.lon,
            dataType: "json",
            success: function (uvIndexResponse) {
                console.log(uvIndexResponse);
                $(".todayUV").text("UV Index: " + uvIndexResponse.value)

            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function callWeather() {
        $.ajax({
            type: "GET",
            url: weatherURL + nowWeather + cityName + "&APPID=" + apiKey + units,
            dataType: "json",
            success: function (nowWeather) {
                console.log(nowWeather);
                $(".location").text(nowWeather.name)
                $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + nowWeather.weather[0].icon + "@2x.png")
                $("#weatherIcon").attr("alt", nowWeather.weather[0].description)
                $(".todayTemp").text("Temperature: " + nowWeather.main.temp + "°F")
                $(".todayHumidity").text("Humidity: " + nowWeather.main.humidity + "%")
                $(".todayWind").text("Wind Speed: " + nowWeather.wind.speed + " MPH")
                nowWeatherResponse = nowWeather;
                callUVindex();
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function callWeatherForcast() {
        $.ajax({
            type: "GET",
            url: weatherURL + fiveDayWeather + cityName + "&APPID=" + apiKey + units,
            dataType: "json",
            success: function (responseFive) {
                console.log(responseFive);
                hourlyWeather = responseFive;
                forcastLoop();
                console.log(moment().add(10, 'days').format('YYYY-MM-DD') + " 00:00:00");
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
});


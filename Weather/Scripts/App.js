'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage(){
    $(document).ready(function () {
        var openWeatherMapAPI = "";
        var weatherId = 800;
        var temp = 999;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                openWeatherMapAPI = "https://api.openweathermap.org/data/2.5/weather?lat=" +
                                     position.coords.latitude + "&lon=" + position.coords.longitude +
                                     "&units=imperial&appid=88e5c6f83341295f393ce1edb1d37184";
                fetchWeather(openWeatherMapAPI);
            });
        }

        function fetchWeather(API) {
            $.getJSON(API, function (json) {
                temp = parseInt(json.main.temp);

                if ($('input[name="degType"]:checked').val() === "F") {
                    $("#temp").html(temp + " deg F");
                } else {
                    $("#temp").html(toCelsius(temp) + " deg C");
                }

                $("#location").html(json.name + ", " + json.sys.country);
                $("#weathertype").html(json.weather[0].description);

                weatherId = json.weather[0].id;

                $("#weatherimage").html('');

                if (weatherId >= 200 && weatherId < 550) {
                    $("#weatherimage").addClass('wi wi-day-rain');
                } else if (weatherId >= 600 && weatherId < 700) {
                    $("#weatherimage").addClass('wi wi-day-snow');
                } else if (weatherId >= 700 && weatherId < 800) {
                    $("#weatherimage").addClass('wi wi-day-fog');
                } else {
                    $("#weatherimage").addClass('wi wi-day-sunny');
                }
            });
        }

        $("input[name='degType']").click(function () {
            fetchWeather(openWeatherMapAPI);
        });

        function toCelsius(f) {
            return parseInt((5 / 9) * (f - 32));
        }
    });
}

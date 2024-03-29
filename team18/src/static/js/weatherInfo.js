$(document).ready(function() {
    getData();
});

function getData() {
    var data;

    $.getJSON('http://127.0.0.1:5000/weather', null, function(d) {
        var data = d.weather;
        var weatherID = data[0][1];
        var weatherTemp = data[0][2];
        var weatherDesc = data[0][3];

        weatherDesc = titleCase(weatherDesc);
        var weatherIcon = changeWeatherIcon(weatherDesc);

        $("#wTemp1").addClass("wi wi-thermometer");
        $('#wTemp2').html("&nbsp" + weatherTemp);
        $('#wTemp3').html("°C");
        $('#wIcon').html(weatherIcon);
        $('#wDesc').html(weatherDesc);
    })
}

function changeWeatherIcon(weatherType) {

    weatherType = weatherType.toLowerCase();
    $("#wIcon").text("");
    $("#wIcon").append("<i></i>");

    if (weatherType.indexOf("clouds") != -1) {
        return $("#wIcon").addClass("wi wi-cloudy");
    } else if (weatherType.indexOf("rain") != -1) {
        return $("#wIcon").addClass("wi wi-rain");
    } else if (weatherType.indexOf("thunderstorm") != -1) {
        return $("#wIcon").addClass("wi wi-thunderstorm");
    } else if (weatherType.indexOf("snow") != -1) {
        return $("#wIcon").addClass("wi wi-snow");
    } else if (weatherType.indexOf("mist") != -1) {
        return $("#wIcon").addClass("wi wi-smoke");
    } else {
        return $("#wIcon").addClass("wi wi-day-sunny");
    }
}

function titleCase(str) {
    var array = str.split(" ");

    for (var i = 0; i < array.length; i++) {
        var temp_array = array[i].split(''); // "ab" => "a","b"
        temp_array[0] = temp_array[0].toUpperCase(); // "a","b" => "A","b"

        for (var j = 1; j < temp_array.length; j++)
            temp_array[j] = temp_array[j].toLowerCase(); // "a","b" => "A","b"
        array[i] = temp_array.join(''); // "A","b" => "Ab"
    }

    return array.join(' ');
}
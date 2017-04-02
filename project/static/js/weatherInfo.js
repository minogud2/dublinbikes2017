$(document).ready(function(){
  getData();
});

    function getData(){
        var data;
    $.getJSON('testWeather.json', function(d){
        console.log("Assigning the data... ");
        var data = d.dbdata;
        var weatherID = data[0][1];
        var weatherTemp = data[0][2];
        var weatherDesc = data[0][3];
        var weatherIcon = data[0][4];
        
    $('#wTemp').html(weatherTemp + "°");
    $('#wID').html(weatherID);
    $('#wDesc').html(weatherDesc);
    $('#wIcon').html("<img src='http://openweathermap.org/img/w/" + weatherIcon + ".png'>");
})
}
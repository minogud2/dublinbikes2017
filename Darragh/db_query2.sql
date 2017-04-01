SELECT DISTINCT
    weather.timeStamp,
    weather.weatherID,
    weather.temp,
    weather.descp,
    weather.icons
FROM
    test_dbikes.weather
ORDER BY timeStamp
LIMIT 1;
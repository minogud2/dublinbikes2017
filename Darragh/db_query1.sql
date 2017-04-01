SELECT DISTINCT
    static.num,
    static.addr,
    dynamictest.last_update,
    dynamictest.status,
    static.lat,
    static.longti,
    dynamictest.available_bikes,
    dynamictest.available_bike_stands,
    dynamictest.bike_stands,
    dynamictest.banking
FROM
    test_dbikes.static,
    test_dbikes.dynamictest
WHERE
    static.num = dynamictest.num
ORDER BY last_update
LIMIT 101;

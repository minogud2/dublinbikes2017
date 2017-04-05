from flask import Flask, render_template, url_for, request, session, flash, g, jsonify
import functools
import sys
from flask_mysqldb import MySQLdb
import dbconnect

#create appl object
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

sql = """SELECT DISTINCT
    static.num,
    static.addr,
    DynamicTest.last_update,
    DynamicTest.status,
    static.lat,
    static.longti,
    DynamicTest.available_bikes,
    DynamicTest.available_bike_stands,
    DynamicTest.bike_stands,
    DynamicTest.banking
FROM
    static,
    DynamicTest
WHERE
    static.num = DynamicTest.num
ORDER BY DynamicTest.uniqueID DESC
LIMIT 101;"""

sql1 = """SELECT DISTINCT
    weather.timeStamp,
    weather.weatherID,
    weather.temp,
    weather.descp,
    weather.icons
FROM
    weather
ORDER BY uniqueID
LIMIT 1;"""

@app.route('/weather')
def get_weather():
    g.db = dbconnect.connection()
    c = g.db.cursor()
    cur = c.execute(sql1) 
    rows = c.fetchall()
    weather = []
    for eachRow in rows:
        weather.append(eachRow)
    c.close()
    g.db.close()
    return jsonify(weather=weather)

@app.route('/stations1')
@functools.lru_cache(maxsize=128)
def get_dynamicData():
    g.db = dbconnect.connection()
    c = g.db.cursor()
    cur = c.execute(sql) 
    rows = c.fetchall()
    stations = []
    for eachRow in rows:
        stations.append(eachRow)
    c.close()
    g.db.close()
    return jsonify(stations=stations)

if __name__ == '__main__':
        app.run(debug=True)
from flask import Flask, render_template, url_for, request, session, flash, g, jsonify
from functools import wraps
import sys
from flask_mysqldb import MySQLdb
import dbconnect

#create appl object
app = Flask(__name__)

sql = """SELECT DISTINCT
    static.num,
    static.addr,
    DynamicTest.last_update,
    DynamicTest.available_bikes
FROM
    static,
    DynamicTest
WHERE
    static.num = DynamicTest.num
AND
    static.num = '2'
LIMIT 10;"""

@app.route('/')
def get_mainpage():
    g.db = dbconnect.connection()
    c = g.db.cursor()
    cur = c.execute(sql)
    rows = c.fetchall()
    dbdata = []
    for row in rows:
        dbdata.append(dict(num=row[0], Sname=row[1], time=row[2], bikes=row[3]))
    g.db.close()
    #return jsonify(dbdata=dbdata)
    return render_template('testChart.html', dbdata=dbdata)

if __name__ == '__main__':
        app.run(debug=True)

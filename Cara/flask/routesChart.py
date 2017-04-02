from flask import Flask, render_template, url_for, request, session, flash, g
from flask_googlecharts import GoogleCharts, BarChart

import os
import sqlite3 as lt

#create appl object
app = Flask(__name__, template_folder="templates")
charts = GoogleCharts(app)


@app.route('/')
def hello():
    """ g.db = dbconnect.connection()
    c = g.db.cursor()
    cur = c.execute('select * from mysqldb.static')  # , addr, lat, long from Static')
    g.db = connect_db()"""
    g.db = connect_db()
    cur = g.db.execute('select num, Sname, addr, lat, long from Static')  # , addr, lat, long from Static')
    dbdata = []
    for row in cur.fetchall():
            dbdata.append(dict(num=row[0], Sname=row[1], addr=row[2], lat=row[3], long=row[4]))

    g.db.close()
    return render_template('helloStatic.html', dbdata=dbdata)
    #return josnify(available=data) #makes data a json obj
    #js respond to event, ajax req to flask appl, get response, return json object, call this funct from js
    #return array or list and send data to google charts
    #write py function and call from js

def connect_db():
        app.database = "Dublin_BikesRDB.db"
        return lt.connect(app.database)

def readjson():
    filename = os.path.join(app.static_folder, 'dynamic.json')
    with open(filename) as f:
        dyn_json = json.load(f)

def make_chart():
    my_chart = BarChart("my_chart", options={'title': 'My Test Chart'}, dyn_json)

if __name__ == '__main__':
        app.run(debug=True, use_reloader=True)

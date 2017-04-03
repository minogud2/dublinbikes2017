from flask import Flask, jsonify, render_template, json, url_for, request, session, flash, g
from functools import wraps
import sqlite3 as lt
#import dbconnect
#from flask_mysqldb import MySQLdb

#create appl object
app = Flask(__name__, template_folder="templates")


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
    return render_template('helloStatic.html', dbdata=json.dumps(dbdata))
    #return jsonify(dbdata=dbdata)  # makes data a json obj
    #return josnify(available=data) #makes data a json obj
    #js respond to event, ajax req to flask appl, get response, return json object, call this funct from js
    #return array or list and send data to google charts
    #write py function and call from js


def connect_db():
        app.database = "Dublin_BikesRDB.db"
        return lt.connect(app.database)

if __name__ == '__main__':
<<<<<<< HEAD
        app.run(debug=True)

#@ lru_cache
#_.foreach #_ library for js
#pd.pead_sql_query(, engine, params={"number":station id}, df panads)
#return jsonify(data=json.dumps(list
#%(number
#p convert datetimsse# )
#/occupancy/13,
#rest api endpoints
#load jquery ,lodashjs, bootstrap,app.js,loader.js
=======
        app.run(debug=True, use_reloader=True)
>>>>>>> 43cff648eedb62d4205dc413bbae4b550c6ca190

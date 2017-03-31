from flask import Flask, render_template, url_for, request, session, flash, g
from functools import wraps
import sys
import sqlite3 as lt


#create appl object
app = Flask(__name__)

app.database = "Dublin_BikesRDB.db"


@app.route('/')
def hello():
        con = lt.connect('dublin_BikesRDB.db')
        g.db = connect_db()
        cur = g.db.execute('select num, last_update, status, total_Bikes, avail_bikes, availAndOp_bikes from Dynamic') 

        dbdata = []
        for row in cur.fetchall():
                dbdata.append(dict(num=row[0], last_update=row[1], status=row[2], total_Bikes=row[3], avail_bikes=row[4], availAndOp_bikes=row[5]))

        g.db.close()
        return render_template('helloDynamic.html', dbdata=dbdata)

def connect_db():
        return lt.connect(app.database)

if __name__ == '__main__':
        app.run(debug=True)

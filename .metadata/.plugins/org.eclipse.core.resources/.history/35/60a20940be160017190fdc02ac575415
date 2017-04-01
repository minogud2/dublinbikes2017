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
        cur = g.db.execute('select timeStamp, weatherID, temp, desc, icon from weather') 

        dbdata = []
        for row in cur.fetchall():
                dbdata.append(dict(timeStamp=row[0], weatherID=row[1], temp=row[2], desc=row[3], icon=row[4]))

        g.db.close()
        return render_template('helloWeather.html', dbdata=dbdata)

def connect_db():
        return lt.connect(app.database)

if __name__ == '__main__':
        app.run(debug=True)

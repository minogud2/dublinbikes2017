from flask import Flask, render_template, url_for, request, session, flash, g
from functools import wraps
import sys
import dbconnect

#create appl object
app = Flask(__name__)

@app.route('/')
def hello():
    g.db = dbconnect.connection()
    c = g.db.cursor()
    cur = c.execute('select timeStamp, weatherID, temp, descp, icons from weather') 
    dbdata = []
    rows = c.fetchall()
    for row in rows:
            dbdata.append(dict(timeStamp=row[0], weatherID=row[1], temp=row[2], descp=row[3], icons=row[4]))
    c.close()
    g.db.close()
    
    return render_template('helloWeather.html', dbdata=dbdata)

if __name__ == '__main__':
        app.run(debug=True)
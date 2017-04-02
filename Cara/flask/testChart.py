from flask import Flask, url_for, render_template
from flask_googlecharts import GoogleCharts
from flask_googlecharts import BarChart
import os, json, urllib.request
from flask_mysqldb import MySQLdb

#tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app = Flask(__name__) #, template_folder=tmpl_dir)


def getExchangeRates():
    rates = []
    response = urllib.request.urlopen('http://api.fixer.io/latest')
    data = response.read()
    rdata = json.loads(data, parse_float=float)

    rates.append(rdata['rates']['USD'])
    rates.append(rdata['rates']['GBP'])
    rates.append(rdata['rates']['HKD'])
    rates.append(rdata['rates']['AUD'])
    return rates

@app.route("/")
def index():
    rates = getExchangeRates()
    return render_template('testChart.html', rates=rates)

if __name__ == "__main__":
    app.run(debug=True)
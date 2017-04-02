from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://Tao:abcd2530@dublinbike.clpyaelniude.us-west-2.rds.amazonaws.com/dublinbike18' #write config file
db = SQLAchemy(app)

relate = db.table('test',
        db.Column('num', db.Integer, db.ForeignKey('static.num')),
        db.Column('num', db.Integer, db.ForeignKey('dynamic.num'))
)

class Static(db.Model): #map table in the database to python objects. Class name == table name
    __tablename__ = 'static'
    num = db.Column('num', db.Integer, primary_key=True)
    Sname = db.Column('Sname', db.Text)
    addr = db.Column('addr', db.Text)
    relation = db.relationships('Dynamic', secondary=relate, backrefs=db.backref('subscribers', lazy='dynamic'))

class Dynamic(db.Model):
    numDyn = db.Column('num', db.Integer, primary_key=True)
    last_update = db.Column('Sname', db.VarChar(55), primary_key=True)
    status = db.Column('status', db.Text)
    available_bikes = db.Column('available_bikes', db.Int(11))
    bike_stands = db.Column('bike_stands', db.Int(11))
    available_bike_stands = db.Column('available_bike_stands', db.Int(11))
    banking = db.Column('banking', db.TinyInt)
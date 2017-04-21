import json,urllib.request
import sys
import logging
import rds_config
import pymysql
import sqlite3
import sched, time
import schedule
import datetime
#rds settings


class Connection():



        def __init__(self):
                self.__con =None
                self.__logger = logging.getLogger()
                self.__logger.setLevel(logging.INFO)
                self.__data = None #dynmic bike
                self.__data2 =None #Static bike
                self.__data3 =None #Weather
                self.__date=None 
        def connect_to_AWS(self):
                rds_host  = "dublinbike.clpyaelniude.us-west-2.rds.amazonaws.com"
                name = rds_config.db_username
                password = rds_config.db_password
                db_name = rds_config.db_name

                try:
                    	self.__con = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
                        print(" hello i am connected")
                except:
                       	self.__logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
                        sys.exit()

                self.__logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
                print("after the log")

        def read_from_dublinbike(self):

                url = "https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=a5a72d6f6cd1ffef0ce2648b8c852f7945ce058f"
                try:
                    	response = urllib.request.urlopen(url).read().decode('utf8')

                        self.__data = json.loads(response)
                except IOError:
                        print("This is an error from reading in Dublin Bike")
        def read_from_weather(self):
                url = "https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=a5a72d6f6cd1ffef0ce2648b8c852f7945ce058f"
                try:
                        response = urllib.request.urlopen(url).read().decode('utf8')

                        self.__data = json.loads(response)
                except IOError:
                        print("This is an error from reading in Dublin Bike")
        def read_from_weather(self):

                url='http://api.openweathermap.org/data/2.5/weather?id=2964574&APPID=33e340fbba76a4645e26160abb37f014&units=metric'
                try:
                        response = urllib.request.urlopen(url).read().decode('utf8')
                        self.__data3 =json.loads(response)
                        unix = time.time()

                        self.__date = str(datetime.datetime.fromtimestamp(unix).strftime('%Y-%m-%d %H: %M: %S'))
                #self.__date=unix
                except IOError:
                        print(" This isan error from reading in from weather api")

        def open_StaticJson(self,json_info):
                with open(json_info) as jsonfile:
                        data = json.load(jsonfile)   
        # opens a list with multiple dictionaries inside of it.
                return data
        def read_from_static_file(self):
        # read in json static data into the dataset.
                file = 'static_dublin.json'
                self.__data2 = self.open_StaticJson(file)
        def make_table(self):
                self.connect_to_AWS()
                with self.__con:
                        cur = self.__con.cursor()
                        cur.execute("CREATE TABLE static(num INT PRIMARY KEY, Sname TEXT, addr TEXT, lat REAL, longti REAL)")
                        cur.execute("CREATE TABLE DynamicTest(num INT, last_update VARCHAR(55), status TEXT, available_bikes INT, bike_stands INT, available_bike_stands INT, bankin$
                        cur.execute("CREATE TABLE weather(timeStamp VARCHAR(55) PRIMARY KEY, weatherID INT, temp INT, descp TEXT, icons VARCHAR(5))")
                self.__con.close()
        def add_data_to_dynamic_table(self):
                self.connect_to_AWS()
                self.read_from_dublinbike()
                cur = self.__con.cursor()
                last_update=[]
                available_bike_stands=[]
                status=[]
                available_bikes=[]
                bike_stands=[]
                number=[]
                banking=[]
                i = 0

                while i < len(self.__data):
                        last_update.append(self.__data[i]["last_update"])
                        available_bike_stands.append(self.__data[i]["available_bike_stands"])
                        status.append(self.__data[i]["status"])
                        available_bikes.append(self.__data[i]["available_bikes"])
                        bike_stands.append(self.__data[i]["bike_stands"])
                        number.append(self.__data[i]["number"])
                        banking.append(self.__data[i]["banking"])

                        i += 1
                        for i in range(0, len(self.__data)):

                        cur.execute("INSERT INTO DynamicTest(num, last_update, status, available_bikes, bike_stands, available_bike_stands, banking) VALUES(%s,%s,%s,%s,%s,%s,%s)",
                        (number[i],time.strftime("%a, %d %b %Y %H:%M:%S ", time.gmtime(last_update[i]/1000)), status[i], available_bikes[i], bike_stands[i],available_bike_stands[i]$
                        self.__con.commit()
                cur.close()
                self.__con.close()
        def add_data_to_static_table(self):
                self.connect_to_AWS()
                self.read_from_static_file()
                cur = self.__con.cursor()
                number = []
                name = []
                address = []
                latitude = []
                longitude = []
                i = 0
                while i < len(self.__data2):

                        number.append(self.__data2[i]["number"])
                        name.append(self.__data2[i]["name"])
                        address.append(self.__data2[i]["address"])
                        latitude.append(self.__data2[i]["latitude"])
                        longitude.append(self.__data2[i]["longitude"])
                        i += 1
                for i in range(0, len(self.__data2)):
                        cur.execute("INSERT INTO static (num, Sname, addr, lat, longti) VALUES(%s,%s,%s,%s,%s)",
                            (number[i], name[i], address[i], latitude[i], longitude[i]))
                        self.__con.commit()
                cur.close()
                self.__con.close()
        def add_data_to_weather(self):
                self.connect_to_AWS()
                self.read_from_weather()
                cur = self.__con.cursor()
                weather_id =self.__data3["weather"][0]["id"]
                temperature =self.__data3["main"]["temp"]
                description = self.__data3["weather"][0]["description"]
                weather_icon =self.__data3["weather"][0]["icon"]
                cur.execute("INSERT INTO weather(timeStamp, weatherID, temp, descp, icons) VALUES (%s,%s,%s,%s,%s)",
                (self.__date, weather_id, temperature, description, weather_icon)) 
                self.__con.commit()
                cur.close()
                self.__con.close()
myconnection=Connection()

def do_something():
        print( "Collecting dynmic data...")

        myconnection.add_data_to_dynamic_table()
        #s.enter(5, 1, do_something, (sc,))

#s.enter(5, 1, do_something, (s,))


#s2 = sched.scheduler(time.time, time.sleep)
def do_something2():
        print( "Collecting weather...")
        myconnection.add_data_to_weather()
#               s2.enter(600, 1, do_something2, (sc,))

#s2.enter(600, 1, do_something2, (s2,))
#s2.run()
counter=1
while True:
    do_something()

        time.sleep(50*6)

        if counter%2==0:
                do_something2()

        counter=counter+1
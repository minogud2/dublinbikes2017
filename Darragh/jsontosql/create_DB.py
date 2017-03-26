'''
Created on 26 Mar 2017

@author: minogud2
'''
import json
import sys
import sqlite3 as lt
from pprint import pprint

def create_DB():
    # create database to parse data into. 
    lt.connect('dublin_BikesRDB.db')
    return None
    
def open_StaticJson(json_info):
    with open(json_info) as jsonfile:
        data = json.load(jsonfile)   
        # opens a list with multiple dictionaries inside of it.
    return data

def create_Tables(con):
    try:
        with con:
            # Tables 1) for static Dublin Bike data, 2) for Dynamic Dublin Bike Data, and 3) for Weather data.
            cur.execute("CREATE TABLE static(num INT PRIMARY KEY, Sname TEXT, addr TEXT, lat REAL, long REAL)")
            cur.execute("CREATE TABLE dynamic(num INT, last_update TEXT, status TEXT, total_Bikes INT, avail_bikes INT, availAndOp_bikes INT, PRIMARY KEY(num, last_update), FOREIGN KEY(num) REFERENCES static(num))")
            cur.execute("CREATE TABLE weather(timeStamp TEXT PRIMARY KEY, weatherID INT, temp INT, desc TEXT, icon TEXT)")
    except TypeError as e:  
        print(e)
        return None

def insert_Static(con, data):
    
    number = []
    name = []
    address = []
    latitude = []
    longitude = []
    
    i = 0
    while i < len(data):
        number.append(data[i]["number"])
        name.append(data[i]["name"])
        address.append(data[i]["address"])
        latitude.append(data[i]["latitude"])
        longitude.append(data[i]["longitude"])
        i += 1  
    
    try:
        with con:
            for i in range(0, len(data)):
                cur.execute("INSERT INTO Static (num, Sname, addr, lat, long) VALUES(?,?,?,?,?)",
                            (number[i], name[i], address[i], latitude[i], longitude[i]))
                con.commit()
    except TypeError as e:
        print(e)
        return None

if __name__ == '__main__':
    # create database and open connection.
    try:
        create_DB()
        con = lt.connect('dublin_BikesRDB.db')
        cur = con.cursor()
        create_Tables(con)
        
        # read in json static data into the dataset.
        file = 'static_dublin.json'
        data = open_StaticJson(file)
        insert_Static(con, data)
        
    finally:
        cur.close()
        con.close()
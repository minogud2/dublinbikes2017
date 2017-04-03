'''
Created on 1 Apr 2017

@author: minogud2
'''

from flask_mysqldb import MySQLdb

def connection():
    try:
<<<<<<< HEAD
        conn = MySQLdb.connect(host='localhost',
                               user='root',
                               password='yeroleDC1', 
                               database='mysqldb')
#        c = conn.cursor()
=======
        conn = MySQLdb.connect(host='dublinbike.clpyaelniude.us-west-2.rds.amazonaws.com',
                               user='Tao',
                               password='abcd2530', 
                               database='dublinbike18')
>>>>>>> 0c25ed2088ae9fa222413612ebad0b3ec4949e2b
        return conn
    
    except Exception as e:
        print(e.message, e.args)
        

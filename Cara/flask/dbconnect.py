'''
Created on 1 Apr 2017

@author: minogud2
'''

from flask_mysqldb import MySQLdb

def connection():
    try:
        conn = MySQLdb.connect(host='localhost',
                               user='root',
                               password='4m3hmpp7', 
                               database='test_dbikes')
#        c = conn.cursor()
        return conn
    
    except Exception as e:
        print(e.message, e.args)
        
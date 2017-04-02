'''
Created on 1 Apr 2017

@author: minogud2
'''

from flask_mysqldb import MySQLdb

def connection():
    try:
        conn = MySQLdb.connect(host='dublinbike.clpyaelniude.us-west-2.rds.amazonaws.com',
                               user='Tao',
                               password='abcd2530', 
                               database='dublinbike18')
        return conn
    
    except Exception as e:
        print(e.message, e.args)
        
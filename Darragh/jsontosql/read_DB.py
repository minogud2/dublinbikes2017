'''
Created on 26 Mar 2017

@author: minogud2
'''

import sqlite3 as lt
from pprint import pprint   

con = lt.connect('dublin_BikesRDB.db')
cur = con.cursor()
cur.execute('SELECT * FROM Static')
data = cur.fetchall()
pprint(data)

cur.close()
con.close()

if __name__ == '__main__':
    pass
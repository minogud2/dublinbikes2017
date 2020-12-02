# Masters in Computer Science 2016-2018

Group Project: 2017

Description
Data was gathered from dublin bikes API (http://www.dublinbikes.ie/) and a web app developed for users to check the availability of bikes around dublin city. The map allows users to find the station nearest to the user or use the search option. The app also incorporates weather to indicate a likelihood of the bike being available on arrival. 


1. The project formerly ran on an  ec2 server. 

2.This project contains four executable python code(python3.5):

    1). app.py - main site running on local environment: python3 app.py
    2). performance.py - tests the speed of the project 
    3). data_scraper.py - connects to AWS, makes tables and inserts data into tables on AWS.
    4). test.py - tests several connections from the data scraper such as connection to AWS, the weather and Dublin data API

3. Instruction:

    1). Import the library we use: pip install -r requirements.txt 
    2). Run app.py on local machine and view the website under http://127.0.0.1:5000/
    3). Run test.py, if the connection is good, then you should see the print out to confirm that.
    4). Run performance.py, this section mainly focus on how long does it take to load our daily and weekly chart, the outcome should be a number(seconds)

4. Features
    1) Heatmap activate: double click heat map to activate/deactivate it. 
    2) Daily and weekly weather charts are available inside the marker info window.

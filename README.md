# softEngAssignment4

river_stay [3:03 PM] 
1. The project is running on server on ec2, please view the website here: http://ec2-52-37-147-107.us-west-2.compute.amazonaws.com:5000

2.This project contains four executable python code(python3.5):

    1). app.py for the main website running on local environment: python3 app.py
    2). performance.py to help us to test the speed of ( a certain part) our project 
    3). data_scraper.py are for connection to AWS, make tables and insert data into table on AWS (to protect our database, we disabled the main function)
    4). test.py to test several connections on our data scraper such as connection to AWS, weather and Dublin data API
    5). Here is where you can find our code on Github:

3. Instruction:

    1). Import the library we use: pip install -r requirements.txt 
    2). Run app.py on your local machine and view the website under http://127.0.0.1:5000/
    3). Run test.py, if the connection is good, then you should see the print out to confirm that.
    4). Run performance.py, this section mainly focus on how long does it take to load our daily and weekly chart, the outcome should be a number(seconds)

4. Features
    1) Heat activate: double click heat map to activate it, then it works as switch on/off 
    2) We have daily and weekly chart inside marker info window, it took about 11 seconds to load on weekly-chart ( lots of calculation), so if you click on weekly-button, wait a bit till it loaded.
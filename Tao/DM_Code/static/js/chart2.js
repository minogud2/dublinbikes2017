google.charts.load('current', {
    packages: ['corechart', 'bar']
});
google.charts.setOnLoadCallback(makeChart);
google.charts.setOnLoadCallback(makeChartW);

function makeChart() { //one function for both charts
    $.getJSON('http://127.0.0.1:5000/chart', null, function(data) {
        
        var arr = [];
        for (var x in data) {
            arr.push(parseInt(data[x]['avgVac']))
        }
        var dt = new google.visualization.DataTable();
        dt.addColumn('string', 'Time'); //x-axis
        dt.addColumn('number', 'Available'); //y-axis, availability
        dt.addRows([
            ['6am-9am', arr[0]],
            ['9am-12pm', arr[1]],
            ['12pm-3pm', arr[2]],
            ['3pm-6pm', arr[3]],
            ['6pm-9pm', arr[4]],
            ['9pm-12am', arr[5]],
        ]);

        var options1 = {
            title: 'Popular times',
            legend: {
                position: 'none'
            },
            colors: ['76A7FA'],
            width: 360,
            chartArea: {
                left: 15,
                top: 15
            },
            height: 140,
            bar: {
                groupWidth: "95%"
            },
            hAxis: {
                slantedText: true,
                textStyle: {
                    fontSize: 8 // or the number you want
                }
            },
            vAxis: {
                gridlines: {
                    count: 2
                },
                textStyle: {
                    fontSize: 8
                },
                viewWindow: {
                    max: parseInt(data[0]['TotalBikes']),
                    min: 0
                }
            }
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chartDiv1'));
        chart.draw(dt, options1);
    })
};

//var TotalBikes = parseInt(data[0]['TotalBikes']);
function makeChartW() { //lineChart
        $.getJSON('http://127.0.0.1:5000/chartWeek', null, function(data) {
            if ('weekMean' in data) {
              var wJ = data.weekMean;
            }
               //second chart
//               console.log("HELLO", wJ)
//               console.log(wJ[0])
//               console.log(wJ[0][2])
//               console.log(wJ[1][1])
               var dt2 = new google.visualization.DataTable();
                  dt2.addColumn('string', 'Time');  //x-axis
                  dt2.addColumn('number', 'Mon'); //y-axis, availability
                  dt2.addColumn('number', 'Tues');
                  dt2.addColumn('number', 'Wed');
                  dt2.addColumn('number', 'Thurs');
                  dt2.addColumn('number', 'Fri');
                  dt2.addColumn('number', 'Sat');
                  dt2.addColumn('number', 'Sun');
                  dt2.addRows([
                        ['6am-9am', wJ[0][0], wJ[1][0], wJ[2][0], wJ[3][0], wJ[4][0], wJ[5][0], wJ[6][0]],
                        ['9am-12pm', wJ[0][1], wJ[1][1], wJ[2][1], wJ[3][1], wJ[4][1], wJ[5][1], wJ[6][1]],
                        ['12pm-3pm', wJ[0][2], wJ[1][2], wJ[2][2], wJ[3][2], wJ[4][2], wJ[5][2], wJ[6][2]],
                        ['3pm-6pm', wJ[0][3], wJ[1][3], wJ[2][3], wJ[3][3], wJ[4][3], wJ[5][3], wJ[6][3]],
                        ['6pm-9pm', wJ[0][4], wJ[1][4], wJ[2][4], wJ[3][4], wJ[4][4], wJ[5][4], wJ[6][4]],
                        ['9pm-12am', wJ[0][5], wJ[1][5], wJ[2][5], wJ[3][5], wJ[4][5], wJ[5][5], wJ[6][5]],
                    ]);
               var options2 = {
                title: 'Weekly Trend',
                legend: {
                    position: 'none'
                },
                //colors: ['76A7FA'],
                width: 360,
                chartArea: {
                    left: 15,
                    top: 15
                },
                height: 140,
                seriesType: 'bars',
                series: {6: {type: 'line'}},
                bar: {
                    groupWidth: "95%"
                },
                hAxis: {
                    slantedText: true,
                    textStyle: {
                        fontSize: 8 // or the number you want
                    }
                },
                vAxis: {
                    gridlines: {
                        count: 2
                    },
                    textStyle: {
                        fontSize: 8
                    },
                    viewWindow: {
                        max: wJ[0][6],
                        min: 0
                    }
                }
                };;
               var chart2 = new google.visualization.ComboChart(document.getElementById('chartDiv2'));
                chart2.draw(dt2, options2);
                })};


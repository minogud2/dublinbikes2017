google.charts.load('current', {
    packages: ['corechart', 'bar']
});
google.charts.setOnLoadCallback(makeChart);

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
//second chart
//                var dt2 = new google.visualization.DataTable();
//                    dt2.addColumn('string', 'Last update');
//                      dt2.addColumn('number', 'Bikes free'); //y-axis, weekly average
//                for(var i = 1; i < numRows ; i++) {
//                    dt2.addRow([d[i]['Time'], d[i]['avgVac']])};
//            
//               var options2 = {
//                    title: 'Weekly Availability',
//                    legend: {position: 'none'},
//                    hAxis:
//                    {
//                    textPosition: 'none'},
//                    vAxis: {
//                    textPosition: 'none',
//                    }};    
//           
//               var chart2 = new google.visualization.ColumnChart(document.getElementById('chartDiv2'));
//                chart2.draw(dt2, options2);
//                })};
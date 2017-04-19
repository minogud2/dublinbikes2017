google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(makeChart);

function makeChart() { //one function for both charts
    
       $.getJSON('http://127.0.0.1:5000/chart', null, function(data) {
           
                var arr = [];
                for (var x in data) {
                   arr.push(String(data[x]['Time'])), 
                   arr.push(parseInt(data[x]['avgVac']))
                }
                console.log(arr[1])
                console.log(typeof(arr[0]))
                console.log(typeof(arr[1]))
                
                var dt = new google.visualization.DataTable();
                  dt.addColumn('string', 'Time');  //x-axis
                  dt.addColumn('number', 'avgVac'); //y-axis, availability
                  dt.addRows([
                      [arr[0],arr[1]],
                      [arr[2],arr[3]],
                      [arr[4],arr[5]],
                      [arr[6],arr[7]],
                      [arr[8],arr[9]],
                      [arr[10],arr[11]],
                  ]);

               var options1 = {
                    title: 'Daily Availability',
                    legend: {position: 'none'},
                    hAxis: {
                    textPosition: 'none'},
                    vAxis: {
                    textPosition: 'none'}};    
           
               var chart = new google.visualization.ColumnChart(document.getElementById('chartDiv1'));
                chart.draw(dt, options1);
            })};
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
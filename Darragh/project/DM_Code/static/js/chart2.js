google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(makeChart);

function makeChart() { //one function for both charts
    
        $.getJSON('http://127.0.0.1:5000/chart', null, function(data) { 
            if ('chdata' in data) {
                var d = data.chdata; 
                };
                var numRows = d.length;
            
                //first chart
				var dt = new google.visualization.DataTable();
                    dt.addColumn('string', 'Last update');  //x-axis
	      		    dt.addColumn('number', 'Bikes free'); //y-axis, availability
                for(var i = 1; i < numRows ; i++) {
                    dt.addRow([d[i][1], d[i][2]])
                }; 
            
                var options1 = {
                    title: 'Hourly Availability at Chatham Station',
                    legend: {position: 'none'},
                    hAxis: {
                    textPosition: 'none'},
                    vAxis: {
                    textPosition: 'none'}};    
            
                var chart = new google.visualization.ColumnChart(document.getElementById('chartDiv1'));
                chart.draw(dt, options1);
            
                //second chart
                var dt2 = new google.visualization.DataTable();
                    dt2.addColumn('string', 'Last update');
	      		    dt2.addColumn('number', 'Bikes free'); //y-axis, weekly average
                for(var i = 1; i < numRows ; i++) {
                    dt2.addRow([d[i][1], d[i][2]])};
            
                var options2 = {
                    title: 'Weekly Availability at Chatham Station',
                    legend: {position: 'none'},
                    hAxis:
                    {
                    textPosition: 'none'},
                    vAxis: {
                    textPosition: 'none',
                    }};    
            
                var chart2 = new google.visualization.ColumnChart(document.getElementById('chartDiv2'));
                chart2.draw(dt2, options2);
                    })
                };


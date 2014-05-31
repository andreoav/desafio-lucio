(function($) {

  $(document).ready(function() {

    var chartOptions = {
      credits: false,
      rangeSelector: {
        enabled: false
      },
      xAxis: {
        allowDecimals: false,
        type: 'datetime',
        title: {
          text: 'Tempo'
        },
        labels: {
          formatter: function() {
            return this.value;
          }
        }
      },
      yAxis: [{
        labels: {
          format: '{value} ºC'
        },
        title: {
          text: 'Temperatura'
        }
      }, {
        labels: {
          formatter: function() {
            return this.value + '%';
          }
        },
        title: {
          text: 'Umidade'
        }
      }],
      navigator: {
        xAxis: {
          labels: {
            formatter: function() {
              return this.value;
            }
          }
        }
      },
      tooltip: {
        shared: true,
        formatter: function() {
          var s = '<b>'+ this.x +'</b>';
                
          $.each(this.points, function(i, point) {
              s += '<br/>'+ point.series.name +': '+ point.y;
          });
          
          return s;
        }
      },
      plotOptions: {
        line: {
          marker: {
            enabled: false
          }
        }
      }

    };

    window.chart1 = new Highcharts.StockChart($.extend(chartOptions, {
      title: {
        text: 'Gráfico da Sala'
      },
      chart: {
        renderTo: 'grafico-sala',
        zoomType: 'x'
      },
      series: [{
        name: 'Temperatura',
        type: 'line',
        yAxis: 0
      }, {
        name: 'Umidade',
        type: 'line',
        yAxis: 1
      }]
    }));
    
    window.chart2 = new Highcharts.StockChart($.extend(chartOptions, {
      title: {
        text: 'Gráfico de Fora'
      },
      chart: {
        renderTo: 'grafico-fora',
        zoomType: 'x'
      },
      series: [{
        name: 'Temperatura',
        type: 'line',
        yAxis: 0
      }, {
        name: 'Umidade',
        type: 'line',
        yAxis: 1
      }]
    }));

    var atualizaDados = function() {

      $.ajax({

        url: "https://dl.dropboxusercontent.com/s/5spn07kucf12rbv/UTxt_13-1105-D.txt"

      }).done(function(data) {


        var newData = data.split(/\r\n|\r|\n/g);
        var size = newData.length;

        var temperaturas = [], umidades = [];

        for (i = 1 ; i < size - 1; ++i)
        {
          var splitLine = newData[i].split(/,/);
          
          if (splitLine.length > 0)
          {
            var _umidade = [parseInt(splitLine[0]), parseInt(splitLine[1])];
            umidades[i - 1] =_umidade;

            var _temperatura = [parseInt(splitLine[0]), parseInt(splitLine[2])];
            temperaturas.push(_temperatura);
          }
        }

        chart1.series[0].setData(temperaturas);
        chart1.series[1].setData(umidades); 

      });

      $.ajax({

        url: "https://dl.dropboxusercontent.com/s/mqqvnh0378b4zpp/UTxt_13-1102.txt"

      }).done(function(data) {


        var newData = data.split(/\r\n|\r|\n/g);
        var size = newData.length;

        var temperaturas = [], umidades = [];

        for (i = 1 ; i < size - 1; ++i)
        {
          var splitLine = newData[i].split(/,/);
          
          if (splitLine.length > 0)
          {
            var _umidade = [parseInt(splitLine[0]), parseInt(splitLine[1])];
            umidades[i - 1] =_umidade;

            var _temperatura = [parseInt(splitLine[0]), parseInt(splitLine[2])];
            temperaturas.push(_temperatura);
          }
        }

        chart2.series[0].setData(temperaturas);
        chart2.series[1].setData(umidades); 

      });

    };

    atualizaDados();
    setInterval(atualizaDados, 5 * 60 * 1000);

  });


})(jQuery);
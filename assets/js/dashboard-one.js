
$(function(){
  'use strict'

  $('#vmap').vectorMap({
    map: 'usa_en',
    showTooltip: true,
    backgroundColor: '#fff',
    color: '#d1e6fa',
    colors: {
      fl: '#69b2f8',
      ca: '#69b2f8',
      tx: '#69b2f8',
      wy: '#69b2f8',
      ny: '#69b2f8'
    },
    selectedColor: '#00cccc',
    enableZoom: false,
    borderWidth: 1,
    borderColor: '#fff',
    hoverOpacity: .85
  });


  var ctxLabel = ['6am', '10am', '1pm', '4pm', '7pm', '10pm'];
  var ctxData1 = [20, 60, 50, 45, 50, 60];
  var ctxData2 = [10, 40, 30, 40, 55, 25];

  // Bar chart
  var ctx1 = document.getElementById('chartBar1').getContext('2d');
  var chartBar = new Chart(ctx1, {
    type: 'horizontalBar',
    data: {
      labels: ctxLabel,
      datasets: [{
        data: ctxData1,
        backgroundColor: '#69b2f8'
      }, {
        data: ctxData2,
        backgroundColor: '#d1e6fa'
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false,
        labels: {
          display: false
        }
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false,
            beginAtZero: true,
            fontSize: 10,
            fontColor: '#182b49'
          }
        }],
        xAxes: [{
          gridLines: {
            display: true,
            color: '#eceef4'
          },
          barPercentage: 0.6,
          ticks: {
            beginAtZero: true,
            fontSize: 10,
            fontColor: '#8392a5',
            max: 80
          }
        }]
      }
    }
  });

  window.darkMode = function(){
    var s1 = flot1.getOptions();
    s1.xaxes[0].tickColor = 'rgba(255,255,255,.05)';
    flot1.setupGrid();
    flot1.draw();

    var s2 = flot2.getData();
    s2[1].color = '#141c2b';
    flot2.setData(s2);
    flot2.draw();

    chartBar.options.scales.xAxes[0].gridLines.color = 'rgba(255,255,255,.06)';
    chartBar.update();

    $('.btn-white').addClass('btn-dark').removeClass('btn-white');
    $('#vmap').vectorMap('set', 'backgroundColor', '#1c273c');
  }

  window.lightMode = function() {
    var s1 = flot1.getOptions();
    s1.xaxes[0].tickColor = 'rgba(255,255,255,.2)';
    flot1.setupGrid();
    flot1.draw();

    var s2 = flot2.getData();
    s2[1].color = '#f0f1f5';
    flot2.setData(s2);
    flot2.draw();

    chartBar.options.scales.xAxes[0].gridLines.color = '#eceef4';
    chartBar.update();

    $('.btn-dark').addClass('btn-white').removeClass('btn-dark');
    $('#vmap').vectorMap('set', 'backgroundColor', '#fff');
  }

  var hasMode = Cookies.get('df-mode');
  if(hasMode === 'dark') {
    darkMode();
  } else {
    //lightMode();
  }
})

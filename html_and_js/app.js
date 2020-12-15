function init() {  
  d3.csv("cbb.csv", function(d) {
    return {
      team : d.TEAM,
      wins : +d.W,
      year : +d.YEAR
    };
  }).then(function(data) {
    console.log(data);

    var wins19 = data.filter(data => data.year == 2019).sort((a, b) => b.wins-a.wins);
    console.log(wins19);

    var wins18 = data.filter(data => data.year == 2018).sort((a, b) => b.wins-a.wins);

    var wins17 = data.filter(data => data.year == 2017).sort((a, b) => b.wins-a.wins);

    var wins16 = data.filter(data => data.year == 2016).sort((a, b) => b.wins-a.wins);

    var wins15 = data.filter(data => data.year == 2015).sort((a, b) => b.wins-a.wins);
    console.log(wins15);
    
    var numWins = wins15.wins
    var teamWin = wins15.team

    var barChart = [{
      y: numWins.slice(0,5),
      x: teamWin.slice(0,5)
    }];

    var barLayout = [{
      title: "Top 5 Wins"
    }];

    Plotly.newPlot("bar", barChart, barLayout);
  })
}


init();
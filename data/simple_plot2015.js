



d3.json("cbb_2015.json").then((cbbData) => {
    data = cbbData.data;
    console.log(data);
  
    // function filterTeams(conf) {
    //   var singleConf = data.map(function (conf) {
    //     return conf[1]
    //   });
    // }
  
    // var filterTeams = data.filter(filterTeams);
  
    // console.log(filterTeams);
  
    var confs = data.map(function (team) {
      return team[0];
    });
    console.log("conference", confs);
  
    var teams = data.map(function (team) {
      return team[1];
    });
    console.log("teams", teams);
  
    var wins = data.map(function (team) {
      return team[2];
  
    });
    console.log("wins", wins);
  
    var games = data.map(function (team) {
      return team[3];
  
    });
    console.log("games", games);
  
    var perc_wins = data.map(function (team) {
      return team[4];
    });
    console.log("perc_wins", perc_wins);
  
    // make a plotly chart
    var data = [
      {
        x: teams,
        y: wins,
        text: confs,
        type: 'bar'
      }
    ];
  
    Plotly.newPlot('myDiv', data);
  });    
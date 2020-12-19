d3.json("cbb_2019.json").then((cbbData) => {
  var selector = d3.select("#selectOption");
  var info = cbbData.data;

  data = cbbData.data;
  console.log(data);


  function filterTeams(conf) {
    var singleConf = data.map(function (conf) {
      return conf[1]
    });
  }

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


  // create a list of distinct conferences
  // see - https://codeburst.io/javascript-array-distinct-5edc93501dc4
  const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  }
  const conferences = confs;
  const distinctConfs = conferences.filter(distinct);
  console.log("distinct conferences", distinctConfs);

  distinctConfs.forEach((conf) => {
    selector
      .append("option")
      .text(conf)
      .property("value", confs);
  });


  // make a plotly chart
  var data = [
    {
      x: confs,
      y: wins,
      text: confs,
      type: 'bar'
    }
  ];

  Plotly.newPlot('jDiv', data);
});    

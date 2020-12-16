function init() {
  d3.csv("cbb.csv", function (d) {
    return {
      conference: d.CONF,
      year: +d.YEAR,
      wins: +d.W,
      games: +d.G
    };
  }).then(function (data) {
    console.log(data);

  })
}


init();
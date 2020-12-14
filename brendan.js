Plotly.d3.csv('cbb_sunburst2019.csv', function(err, rows){
  function unpack(rows, key) {
  return rows.map(function(row) {return row[key]})
}

  var data = [{
        type: "sunburst",
        maxdepth: 4,
        ids: unpack(rows, 'ids'),
        labels: unpack(rows, 'labels'),
        parents: unpack(rows, 'parents'),
        textposition: 'inside',
        insidetextorientation: 'radial'
  }]

  var layout = {margin: {l: 0, r: 0, b: 0, t:0}}

  Plotly.newPlot('myDiv', data, layout)
})
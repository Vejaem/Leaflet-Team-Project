// @TODO: YOUR CODE HERE!

var svgWidth = 1500;
var svgHeight = 1000;

// Define the chart's margins as an object
var chartMargin = {
    top: 0,
    right: 0,
    bottom: 100,
    left: 110
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// load in data from csv and assign as healthData
d3.csv("./assets/data/data.csv").then(function (healthData) {

    // get x and y values (strings) & convert to numbers:
    var plotX = healthData.map(stuff => stuff.age).map(Number);
    var plotY = healthData.map(stuff => stuff.obesity).map(Number);

    // get the min/max and range of x vals (to make plot values not sit on x axis):
    var xExtent = d3.extent(plotX);
    xRange = xExtent[1] - xExtent[0];

    // get the min/max and range of y vals (to make plot values not sit on y axis):  
    var yExtent = d3.extent(plotY);
    yRange = yExtent[1] - yExtent[0];

    // define padding so that data points do not sit on axes (in %):
    var theXPad = 0.1;
    var theYPad = 0.1;

    // scale the x axis of the plot accordingly:
    var xScale = d3.scaleLinear()
        .domain([xExtent[0] - (xRange * theXPad), xExtent[1] + (xRange * theXPad)])
        .range([0, svgWidth - chartMargin.left - chartMargin.right]);

    // scale the y axis of the plot accordingly (note the range...height comes first otherwise y-vals are inverted b/c plot origin is in upper/left):
    var yScale = d3.scaleLinear()
        .domain([yExtent[0] - (yRange * theYPad), yExtent[1] + (yRange * theYPad)])
        .range([svgHeight -  chartMargin.top - chartMargin.bottom, 0]);

    // add data markers to plot:
    var circle = svg.selectAll('.healthCircle') //select all elements with class healthCircle.
        .data(healthData) //attach the data
        .enter().append('circle') //append one circle for each data point. 
        .attr('class', 'healthCircle') //give each circle class healthCircle
        .attr('r', 20) //assign radius
        .attr("cx", function (d) { return xScale(d.age) }) // Position the circles based on their x attributes.
        .attr("cy", function (d) { return yScale(d.obesity) })  // Position the circles based on their y attributes.
        .attr("transform", `translate(${chartMargin.left},0)`)

    // add text to data markers:
    var text = svg.selectAll('text') //select all elements with class healthCircle. 
        .data(healthData) //attach the data
        .enter().append('text')
        .attr("x", function (d) { return xScale(d.age) }) // Position the test based on their x attributes.
        .attr("y", function (d) { return yScale(d.obesity) }) // Position the test based on their y attributes.
        .text(function (d) { return d.abbr; })
        .attr('dx', 100) //moves text left/right
        .attr('dy', 5) //moves text up/down
        .style('fill', 'orange'); 

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var xAxisGroup = svg.append("g")
        .style("font", "30px times")
        .attr('class', 'axis').call(xAxis).attr("transform", `translate(${chartMargin.left},${svgHeight - chartMargin.bottom})`)
        // .attr('class', 'axis').call(xAxis).attr("transform", `translate(0,${svgHeight - chartMargin.bottom})`)
        .call(xAxis);

    var yAxisGroup = svg.append("g")
        .style("font", "30px times")
        .attr('class', 'axis').call(yAxis).attr("transform", `translate(${chartMargin.left},0)`)
        .call(yAxis);

    var xTitle = svg.append("text")
    .style("text-anchor", "middle")
    .style("font", "50px times")
    .attr("x", (svgWidth/2))
    .attr("y", (svgHeight- chartMargin.bottom/3))
    .text("Age (years)");

    var yTitle = svg.append("text")
    .style("text-anchor", "middle")
    .style("font", "50px times")
    .attr("x", 0)
    .attr("y", (svgHeight/2))
    .text("Obesity") 
    .attr("transform", "translate(-450, 500), rotate(-90)") ;


});

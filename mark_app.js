console.clear();

//////////////////////////////////////////////////////////////////////////////////

// Define SVG area dimensions
var svgWidth = 1000;
var svgHeight = 660;

// Define the chart's margins as an object
var margin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 30
};

// width and height when taking margins into consideration
var innerWidth = svgWidth - margin.left - margin.right;
var innerHeight = svgHeight - margin.top - margin.bottom;

//
var svg = d3
    .select("#myPlot")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g");

function init() {
    // define default query
    defaultTeam = "North Carolina";

    buildCharts(defaultTeam);
}

//////////////////////////////////////////////////////////////////////////////////////////////
// a function to make the plot 
function buildCharts(queryTeam) {
    d3.csv("../cbb.csv").then(function (data) {
        var currentQuery = data.filter(function (team) {
            return team.TEAM == queryTeam;
        })
        // First, sort the years b/c data in each object is not necessarily cronological
        currentQuery.sort((a, b) => a.YEAR - b.YEAR);

        console.log(currentQuery)

        // map desired plotting data to variables so that you don't have to update all below: 
        var xValue = currentQuery => +currentQuery.YEAR;
        var yValue = currentQuery => +currentQuery.W;

        // scale X vals
        var xScale = d3.scaleBand()
            .domain(currentQuery.map(d => xValue(d)))
            // .domain(theXvalues)

            // the range needs to take into consideration the translation and margins:
            .range([0, innerWidth - margin.left - margin.right])
            .padding(0.1);

        // scale Y vals
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(currentQuery, yValue)])
            .range([innerHeight, 0]);

        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        // make g(roup) element to translate plot
        var g = svg.append('g')
            // translate the extent of the margins
            .attr('transform', `translate(${margin.left + margin.right}, ${margin.top})`);

        xAxis(g.append('g')
            .attr("class", "x axis")
            .attr('transform', `translate(0, ${innerHeight})`)
            .style("font", "30px times"));

        g.append("text")
            .attr("class", 'x label')
            .attr("text-anchor", "end")
            .attr("x", (innerWidth - margin.left - margin.right + 50) / 2)
            .attr("y", innerHeight + margin.top - 20)
            .text("Year")
            .style("font", "40px times");

        g.append("text")
            .attr("class", 'y label')
            .attr("text-anchor", "end")
            .attr("transform", "translate(-50, 200)rotate(-90)")
            .text("Wins")
            .style("font", "40px times");

        yAxis(g.append('g')
            .style("font", "30px times"));

        // make bars
        // originally I appended to svg.select all. Later, I appended to "g.selectAll" so that chart could be translated
        g.selectAll('rect').data(currentQuery)
            .enter().append('rect')

            .attr('x', d => xScale(xValue(d)))
            .attr('y', d => yScale(yValue(d)))

            .attr('height', d => innerHeight - yScale(yValue(d)))
            .attr('width', xScale.bandwidth())
            .attr('fill', 'red')
            .on("mouseover", function () {
                d3.select(this)
                    .attr("fill", "black")
            })
            .on("click", function (d) {
                toolTip.show(d, this);
            })
            .on("mouseout", function (d) {
                toolTip.hide(d);
                d3.select(this)
                    .attr("fill", "red")
            });
    });

};

////////////////////////////////////////////////////////////////////////////
function makeDrops() {
    d3.csv("../cbb.csv").then(function (data) {

        queryItem2 = "2016";
        var currentQuery2 = data.filter(function (team) {
            return team.YEAR == queryItem2;
        })

        var selector = d3.select("#drop")
            .append("select")
            .attr("id", "dropdown")
            .on("change", function (d) {
                selection = document.getElementById("dropdown");
                d3.selectAll("rect").remove()
                 d3.selectAll("yAxis").remove()
                  d3.selectAll(".tick").remove()
                drillLevel = 1;
                buildCharts(selection.value)
            });

        selector.selectAll("option")
            .data(currentQuery2)
            .enter().append("option")
            .attr("value", function (d) {
                return d.TEAM;
            })
            .text(function (d) {
                return d.TEAM;
            })
    });
};

init();
makeDrops();

var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([100, 0])
    .html(function (d) {
        return (`<p style="color:white"; align = "center"; style="font-size:10px">
            ${(d.CONF)}<br>
            Games Played: ${d.G}<br>
            Wins: ${d.W}<br>
            FG%: ${d.EFG_O}<br>
            Tourney: ${d.POSTSEASON}<br>
            </p>`);
    });

chartGroup.call(toolTip);

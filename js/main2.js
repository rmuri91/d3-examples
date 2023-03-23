
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left},${margin.top})`);

// get the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv").then( function(data) {

  // X axis: scale and draw:
  var x = d3.scaleLinear()
      .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

  // Y axis: initialization
  var y = d3.scaleLinear()
      .range([height, 0]);
      var yAxis = svg.append("g")

  // A function that builds the graph for a specific value of bin
  function update(nBin) {

    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function(d) { return d.price; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(nBin)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(data);

    // Y axis: update now that we know the domain
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));

    // Join the rect with the bins data
    var u = svg.selectAll("rect")
        .data(bins)

    // Manage the existing bars and eventually the new ones:
    u
        .join("rect") // Add a new rect for each new elements
        .transition() // and apply changes to all of them
        .duration(1000)
          .attr("x", 1)
          .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", "#69b3a2")

    }


  // Initialize with 20 bins
  update(20)


  // Listen to the button -> update if user change it
  d3.select("#nBin").on("input", function() {
    update(+this.value);
  });

});



//bubbles

var svg2 = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv").then( function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 12000])
    .range([ 0, width ]);
  svg2.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([35, 90])
    .range([ height, 0]);
  svg2.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 4, 40]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
    .range(d3.schemeSet2);

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3.select("#my_dataviz2")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  const showTooltip = function(event, d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Country: " + d.country)
      .style("left", (event.x)/2 + "px")
      .style("top", (event.y)/2+30 + "px")
  }
  const moveTooltip = function(event, d) {
    tooltip
      .style("left", (event.x)/2 + "px")
      .style("top", (event.y)/2+30 + "px")
  }
  const hideTooltip = function(event, d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  // Add dots
  svg2.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("class", "bubbles")
      .attr("cx", d => x(d.gdpPercap))
      .attr("cy", d => y(d.lifeExp))
      .attr("r", d => z(d.pop))
      .style("fill", d => myColor(d.continent))
    // -3- Trigger the functions
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )

  })

  //radar
  RadarChart.defaultConfig.color = function() {};
  RadarChart.defaultConfig.radius = 3;
  RadarChart.defaultConfig.w = 400;
  RadarChart.defaultConfig.h = 400;
  
  var data = [
    {
      className: 'germany', // optional can be used for styling
      axes: [
        {axis: "strength", value: 6}, 
        {axis: "intelligence", value: 8}, 
        {axis: "charisma", value: 11},  
        {axis: "dexterity", value: 9},  
        {axis: "luck", value: 6}
      ]
    },
    {
      className: 'argentina',
      axes: [
        {axis: "strength", value: 7}, 
        {axis: "intelligence", value: 5}, 
        {axis: "charisma", value: 7},  
        {axis: "dexterity", value: 5},  
        {axis: "luck", value: 9}
      ]
    }
  ];
  
  
  
  var chart = RadarChart.chart();
  var cfg = chart.config(); // retrieve default config
  var svg3 = d3.select('#my_dataviz3').append('svg')
    .attr('width', cfg.w + cfg.w + 50)
    .attr('height', cfg.h + cfg.h / 4);
  svg3.append('g').classed('single', 1).datum(data).call(chart);
  render();


  
// The svg
var svgm = d3.select("#my_datavizm"),
    width = +svgm.attr("width"),
    height = +svgm.attr("height");

// Map and projection
var projection = d3.geoNaturalEarth1()
    .scale(width / 1.3 / Math.PI)
    .translate([width / 2, height / 2])

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then( function(data) {

    // Draw the map
    svgm.append("g")
        .selectAll("path")
        .data(data.features)
        .join("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.geoPath()
            .projection(projection)
            )
            .style("stroke", "#fff")

})
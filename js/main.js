/* Paso 1: Escalas
const widthScale = 960
const heightScale = 540

const xScale = d3.scaleLinear().range([0, widthScale])
const yScale = d3.scaleLinear().range([heightScale, 0])
*/


// Definir dimensiones y márgenes
const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom

// Añadir el objeto SVG al body del documento
const svg = d3.select("#d3-container")
              .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)

// Leer los datos
d3.csv("../data/scatter.csv")
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv",

.then(data => {

  // Añadir eje X
  const x = d3.scaleLinear()
              .domain([0, 4000])
              .range([0, width])
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))

  // Añadir eje Y
  const y = d3.scaleLinear()
              .domain([0, 500000])
              .range([height, 0])
  svg.append("g")
    .call(d3.axisLeft(y))

  // Añadir los puntos
  svg.append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("cx", d => x(d.GrLivArea))
      .attr("cy", d => y(d.SalePrice))
      .attr("r", 1.5)
      .style("fill", "#69b3a2")
})


//ejercicio 1


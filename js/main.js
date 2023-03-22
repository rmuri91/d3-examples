// Paso 1: Escalas
const widthScale = 960
const heightScale = 540

const xScale = d3.scaleLinear().range([0, widthScale])
const yScale = d3.scaleLinear().range([heightScale, 0])
/*
// Paso 2: Construir el contenedor SVG
const margin = {top: 20, right: 20, bottom: 20, left: 20}
const widthBox = 1280 - margin.left - margin.right
const heightBox = 720 - margin.top - margin.bottom

const svg = d3.select("#d3-container")
              .append("svg")
              .attr("viewBox", `0 0 ${widthBox} ${heightBox}`)

const dataset = ["Apple", "Orange", "Mango"]

d3.select("#d3-container").selectAll("p")
    .data(dataset)
    .join("p")
    .attr("class", "fruit")
    .text((data,index) => `Fruta nº ${index}: ${data}`) */

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
                .attr("transform", `translate(${margin.left},${margin.top})`)

// Leer los datos
//d3.csv("C:/Users/AEAT/Documents/d3-examples/data/lines.csv", d => {
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv", d => {
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

  // Cuando los datos hayan sido leídos, darles el formato adecuado:
  return {
    date: d3.timeParse("%Y-%m-%d")(d.date),
    value: d.value
  }

}).then(data => {

  // Añadir eje X (formato fecha)
  const x = d3.scaleTime()
              .domain(d3.extent(data, d => d.date))
              .range([0, width])
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))

  // Añadir eje Y
  const y = d3.scaleLinear()
              .domain([0, d3.max(data, d => +d.value)])
              .range([height, 0])
  svg.append("g")
    .call(d3.axisLeft(y))

  // Añadir la línea
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value))
    )
})
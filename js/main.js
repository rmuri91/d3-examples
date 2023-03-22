// Paso 1: Escalas
const widthScale = 960
const heightScale = 540

const xScale = d3.scaleLinear().range([0, widthScale])
const yScale = d3.scaleLinear().range([heightScale, 0])

// Paso 2: Construir el contenedor SVG
const margin = {top: 20, right: 20, bottom: 20, left: 20}
const widthBox = 1280 - margin.left - margin.right
const heightBox = 720 - margin.top - margin.bottom

const svg = d3.select("#d3-container")
              .append("svg")
              .attr("viewBox", `0 0 ${widthBox} ${heightBox}`)


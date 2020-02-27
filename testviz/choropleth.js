
var margin = {top: 80, right: 25, bottom: 30, left: 40},
  width = 600 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

function createChoropleth(id)
{
  /****** SET UP MAIN DIV FOR CHOROPLETH MAP ******/
  id = "#" + id;
  var choromap = d3.select(id)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  // Map and projection
  var path = d3.geoPath();
  var projection = d3.geoMercator()
    .scale(70)
    .center([0,20])
    .translate([width / 2, height / 2]);

  /****** SET UP COLOR RANGE ******/
  var data = d3.map();
  var colorScale = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemePuRd[7]);


  /****** LOAD DATABASES ******/
  d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
    .await(ready);


// when db's are loaded
  function ready(error, topo) {

/****** MOUSE EVENTS ******/
    let mouseOver = function(d) {
      d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("opacity", .5)
      d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 1)
        .style("stroke", "black")
    }
    let mouseLeave = function(d) {
      d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("opacity", .8)
      d3.select(this)
        .transition()
        .duration(200)
        .style("stroke", "transparent")
    }

/****** TITLE & SUBTITLE ******/
    choromap.append("text")
      .attr("transform", "translate(0, " + -50 + ")")
      .attr("text-anchor", "left")
      .style("font-size", "22px")
      .style("font-family", "'Raleway'")
      .text("Cause of death over the regions of Sweden.");

    choromap.append("text")
        .attr("transform", "translate(0, " + -20 + ")")
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("font-family", "'Simonetta'")
        .style("fill", "grey")
        .style("max-width", 400)
        .text("A short description of the take-away message of this chart.");


    // Draw the map
    choromap.append("g")
      .selectAll("path")
      .data(topo.features)
      .enter()
      .append("path")
        // draw each country
        .attr("d", d3.geoPath()
          .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d) {
          d.total = data.get(d.id) || 0;
          return colorScale(d.total);
        })
        .style("stroke", "transparent")
        .attr("class", function(d){ return "Country" } )
        .style("opacity", .8)
        .on("mouseover", mouseOver )
        .on("mouseleave", mouseLeave )   
  }
}


function createSlider()
{

  var data = [1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 
  2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];

 // Vertical
  var sliderVertical = d3.sliderLeft()
    .min(d3.min(data))
    .max(d3.max(data))
    .height(300)
    .tickFormat(d3.format('1'))
    .ticks(22)
    .step(1)
    .default(2018)
    .on('onchange', val => {
      d3.select('p#current-slider-value')
      .text(d3.format('1')(val))
      .style("font-size", "22px")
      .style("font-family", "'Raleway'");

      console.log(val)
    });

  var gVertical = d3
    .select('div#slider-vertical')
    .append('svg')
    .attr('width', 100)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(60,30)');

  gVertical.call(sliderVertical);

  d3.select('p#current-slider-value')
    .text(d3.format('1')(sliderVertical.value()))
    .style("font-size", "22px")
    .style("font-family", "'Raleway'");

}
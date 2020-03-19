  /**************************
  *      CHOROPLETH MAP     *
  *     code from d3.js     *
  **************************/

var margin = {top: 150, right: 0, bottom: 20, left: 40},
  width = 500 - margin.left - margin.right,
  height = 670 - margin.top - margin.bottom;

function createChoropleth(id, year)
{
  /****** SET UP MAIN DIV FOR CHOROPLETH MAP ******/
  id = "#" + id;
  var choromap = d3.select(id)
    .append("svg")
    .attr("id", "svg_id")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // Path and projection
  var projection = d3.geoMercator()
    .scale(600)
    .center([20,62])
    .translate([width / 2, height / 2]);

  var geoPath = d3.geoPath()
    .projection(projection);


  /****** LOAD DATABASES ******/
  d3.queue()
    .defer(d3.json, "data/sverige.geo.json")
    .defer(d3.csv, "data/finaldeadper100000.csv")
    .await(ready);


   // when databases are correctly loaded 
   function ready(error, swe, dead) 
   {
      if (error) throw error;

      /****** MOUSE EVENTS ******/
    let mouseOver = function(d) {
      d3.selectAll(".laen")
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
      d3.selectAll(".laen")
        .transition()
        .duration(200)
        .style("opacity", 1)
      d3.select(this)
        .transition()
        .duration(200)
        .style("stroke", "gray")
    }

      // retrieve number of dead in each part of sweden during one year
      var dead_data = selectRegionData(dead, year);

    /****** SET UP COLOR RANGE ******/
    var myColor = d3.scaleSequential()
      .interpolator(d3.interpolateOranges)
      .domain(getDomain())


      // add regions to choropleth
      choromap.append("g")
        .attr("class", "laen")
        .selectAll("path")
          .data( swe.features )
          .enter()
          .append("path")
            .attr("d", geoPath)
            .attr("fill", function(d)
            {
              return myColor(dead_data[d.properties.name]);
            })
            .attr("stroke", "gray")
            .attr("class", function(d){ return "laen" } )
              .style("opacity", 1)
              .on("mouseover", mouseOver )
              .on("mouseleave", mouseLeave ) 



    /****** TITLE & SUBTITLE ******/
    choromap.append("text")
      .attr("transform", "translate(0, " + 30 + ")")
      .attr("text-anchor", "left")
      .style("font-size", "22px")
      .style("font-family", "'Raleway'")
      .text("Cause of death over the regions of Sweden.");

    choromap.append("text")
      .attr("transform", "translate(0, " + 50 + ")")
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("font-family", "'Simonetta'")
      .style("fill", "grey")
      .style("max-width", 400)
      .text("Number of deaths in the regions of Sweden per 100 000 citizens.");
   }
  }



// http://bl.ocks.org/darrenjaworski/5392389
// http://bl.ocks.org/darrenjaworski/5397202

// http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/

function createSlider(startYear)
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
    .default(startYear)
    .on('onchange', val => {
      d3.select('p#current-slider-value')
      .text(d3.format('1')(val))
      .style("font-size", "22px")
      .style("font-family", "'Raleway'")

      d3.select("#svg_id").remove();
      choroplethButton(val);
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

// set the dimensions and margins of the heat maps
var margin = {top: 80, right: 25, bottom: 30, left: 40},
  width_ = 450 - margin.left - margin.right,
  height_ = 450 - margin.top - margin.bottom;


function addHeatMap(id, dataUrl, interpolation)
{
  /****** SET UP MAIN DIV FOR HEATMAP ******/
  id_ = "#" + id;
  var heatmap = d3.select(id_)
  .append("svg")
  .attr("width", width_ + margin.left + margin.right)
  .attr("height", height_ + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


  /****** READ DATA ******/
  d3.csv(dataUrl, function(data) 
  {
    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var myGroups = d3.map(data, function(d){return d.group;}).keys()
    var myVars = d3.map(data, function(d){return d.variable;}).keys()

    /****** SCALES & AXISES ******/
    // x-scales & axis
    var x = d3.scaleBand()
      .range([ 0, width_ ])
      .domain(myGroups)
      .padding(0.05);
    heatmap.append("g")
      .style("font-size", 15)
      .attr("transform", "translate(0," + height_ + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
      .range([ height_, 0 ])
      .domain(myVars)
      .padding(0.05);
    heatmap.append("g")
      .style("font-size", 15)
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove()


    /****** COLOR SETUP WITH GIVEN INTERPOLATION METHOD ******/
    var myColor = d3.scaleSequential()
      .interpolator(interpolation)
      .domain([1,100])

      // colorbrewer ? 
      // var colors = colorbrewer.Set2[6];


    /****** CREATE TOOLTIP ******/
    var tooltip = d3.select("p#exact-value")
      .style("opacity", 0)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("text-align", "center");

    /****** MOUSE EVENTS ******/
    var mouseover = function(d) {
      tooltip
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
    var mousemove = function(d) {
      tooltip
        .html("The exact value of this cell is: " + d.value)
        
      var toolBox = d3.select("#valueBox")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY-100) + "px")
    }
    var mouseleave = function(d) {
      tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }


    /****** ADD VALUE SQUARES ******/
    heatmap.selectAll()
      .data(data, function(d) {return d.group+':'+d.variable;})
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.group) })
        .attr("y", function(d) { return y(d.variable) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d.value)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
  

    /****** TITLE & SUBTITLE ******/
    if(id == "mental_illness")
      id = "mental illness";

    // Add title to graph
    heatmap.append("text")
      .attr("x", 0)
      .attr("y", -50)
      .attr("text-anchor", "left")
      .style("font-size", "22px")
      .style("font-family", "'Raleway'")
      .text("Cause of death: " + id);

      // Add subtitle to graph
    heatmap.append("text")
      .attr("x", 0)
      .attr("y", -25)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("font-family", "'Simonetta'")
      .style("fill", "grey")
      .style("max-width", 400)
      .text("Number of casualties caused by " + id + ", varying over " );

    heatmap.append("text")
      .attr("x", 0)
      .attr("y", -10)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("font-family", "'Simonetta'")
      .style("fill", "grey")
      .style("max-width", 400)
      .text("time in different age groups.");
  })
}


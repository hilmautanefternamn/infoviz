
window.onload = function()
{
	diagnosesButton();
}

// HEAT MAP WITH YEARS and CAUSE OF DEATH
// Load and prepare data to create one heatmap
// for each cause of death: diseases, mental illness,
// violence & traffic
function diagnosesHeatMap()
{
var data = "data/finaldeadper100000.csv"

  // prepare data for heatmaps
  d3.csv(data, function(data) 
  { 
    // 1 - cause of death: disease
    var disease_data = selectDiagnosisData(data, 1);

    // 2 - cause of death: mental illness
    var mental_illness_data = selectDiagnosisData(data, 2);

    //3 - cause of death: violence
    var violence_data = selectDiagnosisData(data, 3);

    //4 - cause of death: traffic
    var traffic_data = selectDiagnosisData(data, 4);
    
    addHeatMap("diagnosis", "disease", disease_data, d3.interpolateBlues, [100,15000]);
    addHeatMap("diagnosis", "violence", mental_illness_data, d3.interpolateGreens, [1,2000]);
    addHeatMap("diagnosis", "mental_illness", violence_data, d3.interpolatePurples, [0,5]);
    addHeatMap("diagnosis", "traffic", traffic_data, d3.interpolateReds, [1,10]);

  })
}
// helper function to change between sets of heatmaps
var isFirstClick = true;
function diagnosesButton()
{
document.getElementById('diagnosisMaps').style.display = "flex";
document.getElementById('ageGroupMaps').style.display = "none";
document.getElementsByTagName('button')[0].disabled = false;
document.getElementsByTagName('button')[1].disabled = true;

if(isFirstClick)
  diagnosesHeatMap();

isFirstClick = false;
}

// map age groups
var ageGroups = {"1": "0-4", "2": "5-6", "3": "10-24", "4": "15-19", 
"5": "20-24", "6": "25-29", "7": "30-34", "8": "35-39", "9": "40-44", 
"10": "45-49", "11": "50-54", "12": "55-59", "13": "60-64", "14": "65-69", 
"15": "70-74", "16": "75-79", "17": "80-84", "18": "85+"};

// Data preparation for diagnoses heatmaps 
// selects data related to a specified cause of death 
function selectDiagnosisData(data, diagnosis)
{
var return_data = data.map(function(d)
{ 
  if(d.Region == 0 && d.Diagnosis == diagnosis && d.Age != 19){
    return {
      Year: d.Year.substr(2, d.Year.length),
      Age: ageGroups[d.Age],
      Value: d.Value
    }
  }
})

// remove slots with undefined 
return_data = return_data.filter(function( element ) {
 return element !== undefined;
})

return return_data;
}



// HEAT MAP WITH YEAR and AGE GROUPS
// Load and prepare data to create one heatmap
// for each age group: children, young adults,
// adults & seniors
function ageGroupHeatMap()
{
var data = "data/dead_age_group.csv"

// prepare data for heatmaps
d3.csv(data, function(data) 
{ 
  // 1 - age group: children
  var child_data = selectAgeGroupData(data, 1);

  // 2 - age group: young adults
  var young_adult_data = selectAgeGroupData(data, 2);

  //3 - age group: adults
  var adult_data = selectAgeGroupData(data, 3);

  //4 - age group: seniors
  var senior_data = selectAgeGroupData(data, 4);

  addHeatMap("ageGroups", "Children", child_data, d3.interpolateBlues, [0,80]);
  addHeatMap("ageGroups", "Young_Adults", young_adult_data, d3.interpolateGreens, [1,20]);
  addHeatMap("ageGroups", "Adults", adult_data, d3.interpolatePurples, [1,80]);
  addHeatMap("ageGroups", "Seniors", senior_data, d3.interpolateReds, [1,30000]);

})
}
// helper function to change between sets of heatmaps
var firstClick = true;
function ageGroupButton()
{
  document.getElementById('diagnosisMaps').style.display = "none";
  document.getElementById('ageGroupMaps').style.display = "flex";
  document.getElementsByTagName('button')[0].disabled = true;
  document.getElementsByTagName('button')[1].disabled = false;

  if(firstClick)
    ageGroupHeatMap();

  firstClick = false;
}


// Data preparation for age groups heatmaps 
// selects data related to a specified age group 
function selectAgeGroupData(data, age)
{
var return_data = data.map(function(d)
{ 
  if(d.Region == 0 && d.Age == age){
    return {
      Year: d.Year.substr(2, d.Year.length),
      Diagnosis: d.Diagnosis,
      Value: d.Value
    }
  }
})


// remove slots with undefined
return_data = return_data.filter(function( element ) {
 return element !== undefined;
})

return return_data;
}


  /***** NOT USED ATM ******

  function countPeople(data)
  {
    var result = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, 
    "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 
    0, "16": 0, "17": 0, "18": 0, "19": 0};

   data.map(function(d)
   {
      for(var i = 1; i < 20; ++i)
      {
        if(d.Region == 0 && d.Age == i)
          result[i] += parseFloat(d.Value);
      }
   }) 
   return result;
  }

  // relate color intensity to number of deaths
  function createColorRangeAxis(data)
  {
    // parse values strings to floats
    var values = d3.map(data, function(d){return d.Value;}).keys(); 
    for(var i = 0; i < values.length; ++i)
    {
      values[i] = parseFloat(values[i]);
    }

    // map [min, max] to [0,width]
    var rangeX = d3.scaleLinear()
      .range([0, window.innerWidth*0.7])
      .domain( [Math.min(...values), Math.max(...values)] )
    var axis = d3.select("#rangeAxis").append("text")
      .style("font-size", 15)
      .call(d3.axisBottom(rangeX))
      .select(".domain").remove();
  }
  */

window.onload = function()
{
	diagnosesButton();
}

/************** HEAT MAP STUFF  ******************/

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
    // [1, 15000], [1,2000], [0,5], [1,10]
    addHeatMap("diagnosis", "disease", disease_data, d3.interpolateBlues, findMinMax(disease_data));
    addHeatMap("diagnosis", "violence", mental_illness_data, d3.interpolateGreens, findMinMax(mental_illness_data));	//[0,2000]
    addHeatMap("diagnosis", "mental_illness", violence_data, d3.interpolatePurples, findMinMax(violence_data)); //[0,5]
    addHeatMap("diagnosis", "traffic", traffic_data, d3.interpolateReds, findMinMax(traffic_data));

/*	why this does not work for all is a mysterium
    console.log(findMinMax(mental_illness_data))
    console.log(findMinMax(violence_data))
    console.log(findMinMax(disease_data))
    console.log(findMinMax(traffic_data))
*/
  })
}
// helper function to change between maps
var isFirstClick = true;
function diagnosesButton()
{
	document.getElementById('choropleth').style.display = "none";
	document.getElementById('diagnosisMaps').style.display = "flex";
	document.getElementById('ageGroupMaps').style.display = "none";
	document.getElementsByTagName('button')[0].disabled = false;
	document.getElementsByTagName('button')[1].disabled = true;
	document.getElementsByTagName('button')[2].disabled = false;

	if(isFirstClick)
	  diagnosesHeatMap();

	isFirstClick = false;
}

// map age groups
var ageGroups = {"1": "0-4", "2": "5-9", "3": "10-14", "4": "15-19", 
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
var data = "data/dead_ageGroup.csv"

// prepare data for heatmaps
d3.csv(data, function(data) 
{ 
  // 1 - age group: Children [0,14]
  var child_data = selectAgeGroupData(data, 1);

  //3 - age group: youth [15,24]
  var youth_data = selectAgeGroupData(data, 2);

  // 3 - age group: young adults [25-39]
  var young_adult_data = selectAgeGroupData(data, 3);

  //4 - age group: adults [40-64]
  var adult_data = selectAgeGroupData(data, 4);

  //5 - age group: seniors [65+]
  var senior_data = selectAgeGroupData(data, 5);

  console.log(senior_data)

  addHeatMap("ageGroups", "Children", child_data, d3.interpolateBlues, findMinMax(child_data));
  addHeatMap("ageGroups", "Youth", youth_data, d3.interpolateOranges, findMinMax(youth_data));
  addHeatMap("ageGroups", "Young_Adults", young_adult_data, d3.interpolateGreens, findMinMax(young_adult_data));
  addHeatMap("ageGroups", "Adults", adult_data, d3.interpolatePurples, findMinMax(adult_data));
  addHeatMap("ageGroups", "Seniors", senior_data, d3.interpolateReds, findMinMax(senior_data));

})
}
// helper function to change between maps
var firstClick = true;
function ageGroupButton()
{	
	document.getElementById('choropleth').style.display = "none";
	document.getElementById('diagnosisMaps').style.display = "none";
	document.getElementById('ageGroupMaps').style.display = "flex";

	document.getElementsByTagName('button')[0].disabled = true;
	document.getElementsByTagName('button')[1].disabled = false;
	document.getElementsByTagName('button')[2].disabled = false;

	if(firstClick)
	ageGroupHeatMap();

	firstClick = false;
}

var diagnoses = {"1": "disease", "2": "violence", "3":"mental illness", "4": "traffic" };
// Data preparation for age groups heatmaps 
// selects data related to a specified age group 
function selectAgeGroupData(data, age)
{
var return_data = data.map(function(d)
{ 
	if(d.Region == 0 && d.Age == age){
		return {
			Year: d.Year.substr(2, d.Year.length),
			Diagnosis: diagnoses[d.Diagnosis],
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


function findMinMax(data)
{
	// parse values strings to floats
    var values = d3.map(data, function(d){return d.Value;}).keys()
    
    for(var i = 0; i < values.length; ++i)
      	values[i] = parseFloat(values[i]);
    
    return [ Math.min(...values), Math.max(...values) ];
}




/************** CHOROPLETH STUFF  ******************/
var regions = { "1" : 0, "2" : 0, "3" : 0, "4" : 0, "5" : 0, "6" : 0, "7" : 0,
	"8" : 0, "9" : 0, "10" : 0, "11" : 0, "12" : 0, "13" : 0, "14" : 0, "15" : 0,
	"16" : 0, "17" : 0, "18" : 0, "19" : 0, "20" : 0, "21" : 0, "22" : 0,
	"23" : 0, "24" : 0, "25" : 0};


function selectRegionData(data, year)
{
	var names = { "1" : "Stockholms län", "2" : 0, "3" : "Uppsala län", "4" : "Södermanlands län", 
	  "5" : "Östergötlands län", "6" : "Jönköpings län", "7" : "Kronobergs län", "8" : "Kalmar län", 
	  "9" : "Gotlands län", "10" : "Blekinge län", "11" : 0, "12" : "Skåne län", "13" : "Hallands län", 
	  "14" : "Västra Götalands län", "15" : 0, "16" : 0, "17" : "Värmlands län", "18" : "Örebro län", 
	  "19" : "Västmanlands län", "20" : "Dalarnas län", "21" : "Gävleborgs län", "22" : "Västernorrlands län",
	  "23" : "Jämtlands län", "24" : "Västerbottens län", "25" : "Norrbottens län"};

	data.map(function(d)
	{ 
	  if(d.Year == year && d.Region != 0 && d.Age == 19){
	    for(var i = 1; i < 26; ++i)
	    {
	      if(d.Region == i)
	        regions[i] += parseFloat(d.Value);
	    }
	  }
	})

	// map regions to names
	var return_data = {};
	for(var i = 1; i < 26; ++i)
	  return_data[names[i]] = regions[i];         


	return return_data;
}

function getDomain()
{
	var minVal = regions[1];
	var maxVal = regions[1];

	for(var i = 2; i < 26; ++i)
	{
  		if(regions[i] != 0)
	  	{
		    if(regions[i] < minVal)
		    	minVal = regions[i];
		  
		    if(regions[i] > maxVal)
	      		maxVal = regions[i];
	  	}
	}
	console.log("max: " + maxVal + " min: " + minVal )
	return [maxVal, minVal];
}

// helper function to change between maps
var isClicked = true;
function choroplethButton(year)
{
	document.getElementById('choropleth').style.display = "flex";
	document.getElementById('ageGroupMaps').style.display = "none";
	document.getElementById('diagnosisMaps').style.display = "none";
	document.getElementsByTagName('button')[0].disabled = false;
	document.getElementsByTagName('button')[1].disabled = false;
	document.getElementsByTagName('button')[2].disabled = true;

	if(isClicked)
	{
		console.log("in isClicked")
		createSlider("2018");
		createChoropleth("choroMap", "2018");
		isClicked = false;	
	}

	if(year != false)
	{
		createChoropleth("choroMap", year);
		console.log("year: " + year)
	}

	
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
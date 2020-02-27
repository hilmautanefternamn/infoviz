/**
 * @Created Jan 25, 2018
 * @LastUpdate Jan 31, 2020
 * @author Kahin Akram
 */

function kmeans(data, k) {
	
	console.log("Number of clusters: " + k);

    //Crap we need //OMG what kahin?!
    var iterations = 0;
    var maxLoops = 5;
    var qualityChange = 0;
    var oldqualitycheck = 0;
    var qualitycheck = 0;
    var converge = false;
	
	var qualityChangeThreshold = 0.01;
	
    //Parse the data from strings to floats
    var new_array = parseData(data);

    //Task 4.1 - Select random k centroids
    var centroid = initCentroids(new_array,k);

    //Prepare the array for different cluster indices
    var clusterIndexPerPoint = new Array(new_array.length).fill(0);

    //Task 4.2 - Assign each point to the closest mean.
    clusterIndexPerPoint = assignPointsToMeans(new_array, centroid);

    //Master loop -- Loop until quality is good
    do {
        //Task 4.3 - Compute mean of each cluster
        centroid = computeClusterMeans(new_array, clusterIndexPerPoint, k);
        // assign each point to the closest mean.
        var clusterIndexPerPoint = assignPointsToMeans(new_array, centroid);

        //Task 4.4 - Do a quality check for current result
        qualitycheck = qualityCheck(centroid,new_array,clusterIndexPerPoint);
		
		
        //End the loop if...
		qualityChange = Math.abs(qualitycheck - oldqualitycheck);	
		//console.log(qualityChange);
		//console.log(qualityChangeThreshold);
		//console.log(qualityChange < qualityChangeThreshold)
		oldqualitycheck = qualitycheck;		
		if (qualityChange < qualityChangeThreshold)
		{
			converge = true;
			console.log("Number of iterations: " + iterations);
		}
		iterations++;

    }
    while (converge == false)
    //Return results
    return {
        assignments: clusterIndexPerPoint
    };

}

/**
 * Parse data from strings to floats
 * Loop over data length
      loop over every i in data
        Fill array with parsed values, use parseFloat
 * @param {*} data
 * @return {array}
 */
function parseData(data){

    var array = []; //initializes the array
	
	/* console.log(data[0]);	
	console.log(typeof data);
	console.log(typeof data[0]);
	console.log(typeof data[0].A);
	var point = data[1].split(',');
	console.log(point);
	*/
	
	/* for (var i = 0; i < data.length; i++)//loops over the data
	{		
		temp = data[i];
		for (var j = 0; j < temp.length; j++)
		{
			array[i][j] = parseFloat(temp[j]);//parse the data in data to float and put it in the array
		}
	}	
	console.log(array[0][0])
	*/
	
/* 	var array = data.map(entry => 
	Object.entries(entry).reduce((obj, [key, value]) => 
	(obj[key] = parseFloat(value), obj),{}));
	 */
	 // UPPGIVELSE-KOMMENTAR
	 
	 for (var arr in data){
		 // skapa temp för ett dataobjekt från datasetet
		 var temp = [];
		 var counter = 0;
		 for(var point in data[arr]){
			//fyll temp med värdena 
			temp[counter] =  parseFloat(data[arr][point]);
			counter++; 	
		}
		array[arr] = temp;
	 }
    return array;
}

/**
 * Task 4.1 - Randomly place K points
 * Loop over data and Use floor and random in Math
 * @return {array} centroid
 */

function initCentroids(data, k){

    //Create k centroids
	var centroid = []; //initializes the array
	
	
	for (var i = 0; i < k; i++)//loops over the nu,ber of clusters
	{
		centroid[i] = data[Math.floor((Math.random() * data.length))]; //each centroid is assigned a random point from our dataset
	}	
	
	//console.log(centroid);
    return centroid;
}

/**
* Taks 4.2 - Assign each item to the cluster that has the closest centroid
* Loop over points and fill array, use findClosestMeanIndex(points[i],means)
* Return an array of closest mean index for each point.
* @param points
* @param means //centroids från main loopen
* @return {Array}
*/
function assignPointsToMeans(points, means){
	
	var assignments = [];
	
	//loopa igenom points och ge motsvarande index i assignments det cluster point ska tillhöra
	for (var i = 0; i < points.length; i++) 
	{
		assignments[i] = findClosestMeanIndex(points[i], means);		
	}
	
    return assignments;
};
/**
 * Calculate the distance to each mean, then return the index of the closest.
 * Loop over means and fill distance array, use euclideanDistance(point,means[i])
 * return closest cluster use findIndexOfMinimum,
 * @param point
 * @param means
 * @return {Number}
*/
function findClosestMeanIndex(point, means){
	
	var distances = [];
	
	//loopa igenom clusters medelpunkter och beräkna avståndet till punkten
	for (var i = 0; i < means.length; i++) 
	{
		distances[i] = euclideanDistance(point, means[i]);		
	}	

    return findIndexOfMinimum(distances);
};
/**
 * Euclidean distance between two points in arbitrary dimension(column/axis)
 * @param {*} point1
 * @param {*} point2
 * @return {Number}
 */

function euclideanDistance(point1, point2){

    if (point1.length != point2.length)
        throw ("point1 and point2 must be of same dimension");
	
	var sum = 0;
	
	for (var i = 0; i < point1.length; i++) 
	{
		sum += Math.pow(point1[i] - point2[i], 2);
	}
	
	sum = Math.sqrt(sum);
	//console.log(sum);
    return sum;

};

/**
 * Return the index of the smallest value in the array.
 *  Loop over the array and find index of minimum
 * @param array //array of deistances from euclideanDistance
 * @return {Number}
 */
function findIndexOfMinimum(array){

    var index = 0;
	
	for (var i = 1; i < array.length; i++) 
	{
		if(array[i] < array[index]) //sätter index till index för den punkt som har lägst värde
			index = i;			
	}
	//console.log(index);
    return index;
};

/**
 * //Task 4.3 - Compute mean of each cluster
 * For each cluster loop over assignment and check if assignment is equal to cluster index
 * if true fill array
 * then if array is not empty fill newMeans, use averagePosition(array)
 * @param {*} points //coordinates
 * @param {*} assignments //array of which cluster centroid each point is closest to.
 * @param {*} k
 * @returns {array}
 */
function computeClusterMeans(points, assignments, k){

    if (points.length != assignments.length)
        throw ("points and assignments arrays must be of same dimension");

    // for each cluster
    var newMeans = [];
	
	//loopa igenom för varje cluster
	for (var clusterNumber = 0; clusterNumber < k; clusterNumber++) 
	{
		var clusterMembers = [];//skapa temp array för att hålla alla punkter som hör till ett kluster
		counter = 0;
		//gå igenom clusterindex för alla punkter och lägg alla punkter som tillhör nuvarande cluster i clusterMembers
		for(var i = 0; i < assignments.length; i++)
		{
			if(assignments[i] == clusterNumber)
			{
				clusterMembers[counter] = points[i];
				counter++
			}
		}
		
		//Beräkna medelvärdet för punkterna i ett cluster, detta blir den nya centroiden
		if(clusterMembers.length != 0);
			newMeans[clusterNumber] = averagePosition(clusterMembers);
		
	}

    return newMeans;
};

/**
 * Calculate quality of the results
 * For each centroid loop new_array and check if clusterIndexPerPoint equal cluster
 * if true loop over centriod and calculate qualitycheck.
 * @param {*} centroid
 * @param {*} new_array
 * @param {*} clusterIndexPerPoint
 */
function qualityCheck(centroid, new_array, clusterIndexPerPoint){
	
	var qualitycheck = 0;
	
	//loopa för varje kluster
	for(var k = 0; k < centroid.length; k++)
	{
		//för varje punkt i datasettet testa om det tillhör nuvarande kluster
		for(var i = 0; i < new_array.length; i++)
		{
			//om punkten tillhör klustret beräkna qualitycheck
			if(clusterIndexPerPoint[i] == k)
			{
				for(var j = 0; j < new_array[i].length; j++)
				{
					qualitycheck += Math.pow(Math.abs(new_array[i][j] - centroid[k][j]), 2);	
				}				
			}
		}
	}	
	
    return qualitycheck;
}

/**
 * Calculate average of points
 * @param {*} points
 * @return {number}
 */
function averagePosition(points){

    var sums = points[0];
    for (var i = 1; i < points.length; i++){
        var point = points[i];
        for (var j = 0; j < point.length; j++){
            sums[j] += point[j];
        }
    }

    for (var k = 0; k < sums.length; k++)
        sums[k] /= points.length;

    return sums;
};

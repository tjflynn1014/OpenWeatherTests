function CurrentWeather() {
}

function getAppId() {
	return '&appid=4a652c5b1d6447585faa2b712ddaa892';
}

function getApiVersion() {
	return "http://api.openweathermap.org/data/2.5/";
}

CurrentWeather.prototype.getWeather = function(city, unit) {

	if (city === undefined) {
		throw "City not entered";
	}

	var api = getApiVersion() + "weather?q=";
	var weatherData = {};

	// use city ID (number) instead of city name (string)
	if (typeof city === "number") {
		api = getApiVersion() + "weather?id=";
	}

	var url = api + city + getAppId();

	if (unit !== undefined) {
		lowerUnit = unit.toLowerCase();

		if (lowerUnit == "imperial" || lowerUnit == "metric") {
			url += "&units=" + lowerUnit;
		}
	} 

	this.weatherData = sendRequest(url);
	//console.log(this.weatherData);

};


CurrentWeather.prototype.getWeatherByZipcode = function(zipcode, unit) {

	if (zipcode === undefined) {
		throw "Zip code not entered";
	}

	var api = getApiVersion() + "weather?zip=";
	var url = api + zipcode + getAppId();
	var weatherData = {};

	if (unit !== undefined) {
		lowerUnit = unit.toLowerCase();

		if (lowerUnit == "imperial" || lowerUnit == "metric") {
			url += "&units=" + lowerUnit;
		}
	} 

	this.weatherData = sendRequest(url);
	//console.log(this.weatherData);

};


CurrentWeather.prototype.getWeatherByGeoCoord = function(latitude, longitude, unit) {

	if (latitude === undefined) {
		throw "Latitude not entered";
	}

	if (longitude === undefined) {
		 throw "Longitude not entered";
	}

	var api = getApiVersion() + "weather?";
	var url = api + "lat=" + latitude + "&lon=" + longitude + getAppId();
	var weatherData = {};

	if (unit !== undefined) {
		lowerUnit = unit.toLowerCase();

		if (lowerUnit == "imperial" || lowerUnit == "metric") {
			url += "&units=" + lowerUnit;
		}
	} 

	this.weatherData = sendRequest(url);
	//console.log(this.weatherData);

};


CurrentWeather.prototype.getWeatherForCitiesWithinRect = function(bbox, unit) {

	if (bbox === undefined) {
		throw "Bounding Box (bbox) not entered";
	}

	var api = getApiVersion() + "box/city?";
	var cityCount = 0;
	var url = "";
	var weatherData = {};

	url = api + "bbox=" + bbox + getAppId();

	if (unit !== undefined) {
		lowerUnit = unit.toLowerCase();

		if (lowerUnit == "imperial" || lowerUnit == "metric") {
			url += "&units=" + lowerUnit;
		}
	} 

	this.weatherData = sendRequest(url);
	//console.log(this.weatherData);

};


CurrentWeather.prototype.getWeatherForCitiesWithinCircle = function(latitude, longitude, count, unit) {

	if (latitude === undefined) {
		throw "Latitude not entered";
	}

	if (longitude === undefined) {
		 throw "Longitude not entered";
	}

	var api = getApiVersion() + "find?";
	var cityCount = 0;
	var url = "";
	var weatherData = {};

	if (count === undefined || typeof count !== "number") {
		cityCount = 10;
	} else {
		cityCount = count;
	}

	url = api + "lat=" + latitude + "&lon=" + longitude + "&cnt=" + cityCount + getAppId();

	if (unit !== undefined) {
		lowerUnit = unit.toLowerCase();

		if (lowerUnit == "imperial" || lowerUnit == "metric") {
			url += "&units=" + lowerUnit;
		}
	} 

	this.weatherData = sendRequest(url);
	//console.log(this.weatherData);

};


function sendRequest(apiCall) {
	var xmlhttp = new XMLHttpRequest();
	var time = 0;

	try {
		xmlhttp.open("GET", apiCall, false);
		xmlhttp.send();
		return JSON.parse(xmlhttp.response);
	} 
	catch(err) {
		console.log(err.message);
	}

}


CurrentWeather.prototype.getLatitude = function(cityToSearch) {
	var reader = new FileReader();
	var file = '../data/city.list.json';

	reader.onload = function(e) {
		var rawData = reader.result;
		console.log(rawData);
	}

	reader.readAsBinaryString(file);

	var cities = JSON.parse(data);

	console.log(cities);

	for (var city in cities) {
		if (city.name == cityToSearch) {
			console.log("Found City: " + city.name);
		}
	}


};


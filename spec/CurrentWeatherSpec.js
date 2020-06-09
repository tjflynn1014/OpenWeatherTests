describe("Current Weather:", function() {

	describe("Weather By City (Fahrenheit):", function() {

		var weather = new CurrentWeather();
		var city = "Bengaluru";
		var unit = "imperial";
		var longitude = 77.6;
		var latitude =  12.98;
		var fahrenheitRegExp = /\d{1,3}.\d{0,3}/;  // Ex. 48.69

		weather.getWeather(city, unit);

		it("should have the correct city", function() {
			expect(weather.weatherData.name).toEqual(city);
		});

		it("should have the correct latitude", function() {
			expect(weather.weatherData.coord.lat).toEqual(latitude);
		});

		it("should have the correct longitude", function() {
			expect(weather.weatherData.coord.lon).toEqual(longitude);
		});

		it("should have a valid temperature", function() {
			// toMatch uses regular expression
			expect(weather.weatherData.main.temp).toMatch(fahrenheitRegExp);
		});

	});

	describe("Bogus City", function() {
		var weather = new CurrentWeather();
		var city = "xxxxxx";
		var unit = "imperial";
		var errorMsg = "city not found";

		weather.getWeather(city, unit);

		it("should return city not found", function() {
			expect(weather.weatherData.message).toEqual(errorMsg);
		});
		
	});


	describe("Weather By City Id (Metric):", function() {

		var weather = new CurrentWeather();
		var cityId = 6539814;
		var city = "Sorrento";
		var unit = "metric";
		var longitude = 14.37;
		var latitude =  40.62;
		var celsiusRegExp = /\d{1,3}.\d{0,3}/;  // Ex. 11.6

		weather.getWeather(cityId, unit);

		it("should have the correct city", function() {
			expect(weather.weatherData.name).toEqual(city);
		});

		it("should have the correct latitude", function() {
			expect(weather.weatherData.coord.lat).toEqual(latitude);
		});

		it("should have the correct longitude", function() {
			expect(weather.weatherData.coord.lon).toEqual(longitude);
		});

		it("should have a valid temperature", function() {
			// toMatch uses regular expression
			expect(weather.weatherData.main.temp).toMatch(celsiusRegExp);
		});

	});


	describe("Bogus City Id", function() {

		var weather = new CurrentWeather();
		var cityId = 1111111;
		var errorMsg = "city not found";

		weather.getWeather(cityId);

		it("should return city not found", function() {
			expect(weather.weatherData.message).toEqual(errorMsg);
		});


	});

	describe("Weather By ZIP Code (Kelvin):", function() {

		var weather = new CurrentWeather();
		var zipcode = 98105;
		var city = "Seattle";
		var longitude = -122.3;
		var latitude =  47.66;
		var kelvinRegExp = /\d{1,3}.\d{0,3}/;  // Ex. 128

		weather.getWeatherByZipcode(zipcode);

		it("should have the correct city", function() {
			expect(weather.weatherData.name).toEqual(city);
		});

		it("should have the correct latitude", function() {
			expect(weather.weatherData.coord.lat).toEqual(latitude);
		});

		it("should have the correct longitude", function() {
			expect(weather.weatherData.coord.lon).toEqual(longitude);
		});

		it("should have a valid temperature", function() {
			// toMatch uses regular expression
			expect(weather.weatherData.main.temp).toMatch(kelvinRegExp);
		});

	});


	describe("Bogus ZIP Code", function() {

		var weather = new CurrentWeather();
		var zipcode = 99999999999;
		var errorMsg = "city not found";

		weather.getWeatherByZipcode(zipcode);

		it("should return city not found", function() {
			expect(weather.weatherData.message).toEqual(errorMsg);
		});
	});



	describe("Weather By Geographic Coordinates:", function() {

		var weather = new CurrentWeather();
		var city = "Seattle";
		var longitude = -122.33;
		var latitude =  47.61;
		var kelvinRegExp = /\d{1,3}.\d{0,3}/;  // Ex. 128

		weather.getWeatherByGeoCoord(latitude, longitude);

		it("should have the correct city", function() {
			expect(weather.weatherData.name).toEqual(city);
		});

		it("should have the correct latitude", function() {
			expect(weather.weatherData.coord.lat).toEqual(latitude);
		});

		it("should have the correct longitude", function() {
			expect(weather.weatherData.coord.lon).toEqual(longitude);
		});

		it("should have a valid temperature", function() {
			// toMatch uses regular expression
			expect(weather.weatherData.main.temp).toMatch(kelvinRegExp);
		});

	});


	describe("Bogus Geographic Coordinates:", function() {

		var weather = new CurrentWeather();
		var longitude = 1234.32;
		var latitude =  1234.32;
		var errorMsg = "city not found";

		weather.getWeatherByGeoCoord(latitude, longitude);

		it("should return city not found", function() {
			expect(weather.weatherData.message).toEqual(errorMsg);
		});

	});

	describe("Weather For Cities within a Circle:", function() {

		var weather = new CurrentWeather();
		var firstCity = "Seattle";
		var lastCity = "Bellevue";
		var longitude = -122.33;
		var latitude =  47.61;
		var cityCount = 6;
		var cityList = {};

		weather.getWeatherForCitiesWithinCircle(latitude, longitude, cityCount);
		cityList = weather.weatherData.list;

		it("should have the correct number of cities", function() {
			expect(cityList.length).toEqual(cityCount);
		});

		it("the first city should be correct", function() {
			expect(cityList[0].name).toEqual(firstCity);
		});

		it("the last city should be correct", function() {
			expect(cityList[cityList.length-1].name).toEqual(lastCity);
		});

		describe("City Count (Max Boundary):", function() {
			var longitude = -122.33;
			var latitude =  47.61;
			var maxCountPlusOne = 51;
			var cityList = {};
	
			weather.getWeatherForCitiesWithinCircle(latitude, longitude, maxCountPlusOne);
			cityList = weather.weatherData.list;

			// Max number of cities is 50 what happens if we set count to 51
			it("should not go over max city count (50)", function() {
				expect(cityList.length).toEqual(maxCountPlusOne-1);
			});
		});

		describe("City Count (Min Boundary):", function() {
			var longitude = -122.33;
			var latitude =  47.61;
			var minCountMinusOne = -1;
			var cityList = {};
	
			weather.getWeatherForCitiesWithinCircle(latitude, longitude, minCountMinusOne);

			// Minumum number of cities is 0 what happens if we set count to -1
			it("should throw an exception if city count is less than zero", function() {
				expect(weather.weatherData.cod).toEqual("400");
			});
		});
	});


	describe("Weather For Cities within a Rectangle Zone:", function() {

		var weather = new CurrentWeather();
		var boundaryBox = "12,32,15,37,10"; // [lon-left,lat-bottom,lon-right,lat-top,zoom]
		var firstCity = "Birkirkara";
		var lastCity = "Ragusa";
		var cityCount = 15;
		var cityList = {};

		weather.getWeatherForCitiesWithinRect(boundaryBox);
		cityList = weather.weatherData.list;

		it("should have the correct number of cities", function() {
			expect(cityList.length).toEqual(cityCount);
		});

		it("the first city should be correct", function() {
			expect(cityList[0].name).toEqual(firstCity);
		});

		it("the last city should be correct", function() {
			expect(cityList[cityList.length-1].name).toEqual(lastCity);
		});

	});


	describe("Weather For Cities within a Bogus Rectangle Zone:", function() {

		var weather = new CurrentWeather();
		var boundaryBox = "1234,2345,1235,2346,10"; // [lon-left,lat-bottom,lon-right,lat-top,zoom]

		weather.getWeatherForCitiesWithinRect(boundaryBox);

		it("should return zero cities", function() {
			expect(weather.weatherData.cnt).toEqual(0);
		});

	});

});

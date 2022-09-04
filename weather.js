function getWeather() {
  let cityName = document.querySelector(".inputText").value;

  const appid = "175a33d0ef8b2c6d299b48f51d1836bd"; 
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="+appid;

  let response = fetch(url).then((data) => data.json());

  response.then(function (result) {

    // console.log(result);
    
    let city = result.name;
    let countryCode = result.sys.country;
    let utcSeconds = result.dt;
    let date = new Date(0);
    date.setUTCSeconds(utcSeconds);
    date = date.toUTCString();
    let temperature = result.main.temp - 273.15;
    temperature = temperature.toFixed(2);  
    let humidity = result.main.humidity;
    let wind_speed = result.wind.speed * 3.6;   // convert m/s to km/h
    let weather_desc = result.weather[0].description;
    let icon = result.weather[0].icon;

    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    );
    country = regionNames.of(countryCode);

    // set the values in html tags
    let cityNameField = document.querySelector(".city-name");
    cityNameField.textContent = city;

    let countryElement = document.querySelector(".country");
    countryElement.textContent = country;

    let subtitleElement = document.querySelector(".subtitle");
    subtitleElement.textContent = date + ", " + weather_desc;

    let cityTempField = document.querySelector(".temperature");
    cityTempField.textContent = temperature + "° C";

    let humidityField = document.querySelector("#humidity");
    humidityField.textContent = "humidity " + humidity + "%";

    let WindField = document.querySelector("#wind");
    WindField.textContent = "Wind speed: " + wind_speed + " Km/h";

    let weatherImage = document.querySelector(".weather-image");
    weatherImage.src = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

  });
}

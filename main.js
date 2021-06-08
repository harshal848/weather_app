function getWeather(){
    // after button click 

    // getting text box value
    var cityName = document.querySelector(".inputText").value;

    // fetching data from APIs
    fetch("https://meta-weather.vercel.app/api/location/search/?query="+cityName)
        .then(function weather(data){
            return data.json();
        })
        .then(function weather(data){
            var woeId = data[0].woeid;


            fetch("https://meta-weather.vercel.app/api/location/"+woeId+"/")
                .then(function weather(data){
                    return data.json();
                })
                .then(function weather(data){
                    console.log(data)
                    var cityTitle = data.title;
                    var country = data.parent.title;
                    var date = getDate(data.time);

                    var weatherData = data.consolidated_weather[0];
                    var generalWeather = weatherData.weather_state_name;
                    var temp = weatherData.the_temp;
                    var humidity = weatherData.humidity;
                    var wind = weatherData.wind_speed;

                    
                    console.log(cityTitle, country, date, generalWeather, temp);

                    var cityName = document.querySelector(".city-name");
                    cityName.textContent = cityTitle;

                    var countryElement = document.querySelector(".country");
                    countryElement.textContent = country;

                    var subtitleElement = document.querySelector(".subtitle");
                    subtitleElement.textContent = date +", "+ generalWeather;

                    var cityTemp = document.querySelector(".temperature");
                    cityTemp.textContent = temp + "° C";
                    
                    var humidityEl = document.querySelector("#humidity");
                    humidityEl.textContent = "humidity " + humidity + "%";

                    var WindEl = document.querySelector("#wind");
                    WindEl.textContent = "Wind speed: "+ wind + " Km/h";
                    
                })



        })

        
}


function getHistoricalWeather(){
    // after button click 

    // getting text box value
    var inputCityName = document.querySelector(".inputText2").value;
    var inputDate = document.querySelector(".inputDate").value;
    var d = new Date(inputDate);
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();
    console.log(inputDate);
    // fetching data from APIs
    fetch("https://meta-weather.vercel.app/api/location/search/?query="+inputCityName)
        .then(function weather(data){
            return data.json();
        })
        .then(function weather(data){
            var woeId = data[0].woeid;

            var url = "https://meta-weather.vercel.app/api/location/"+woeId+"/"+year+"/"+month+"/"+date+"/";
            console.log(url);
            fetch(url)
                .then(function weather(data){
        
                    console.log(data.json);     //debuging 

                    return data.json();
                })
                .then(function weather(data){
                    // for debuging purpose 
                     var keys = Object.keys(data[0]);
                     console.log(keys)
                     console.log(data[0])
                    // var cityTitle = data[0].title;
                    // var country = data[0].parent.title;
                    // var date = getDate(data[0].time);

                    var generalWeather = data[0].weather_state_name;
                    var temp = data[0].the_temp;
                    var humidity = data[0].humidity;
                    var wind = data[0].wind_speed;

                    

                    var cityName = document.querySelector(".city-name2");
                    cityName.textContent = inputCityName;

                    var countryElement = document.querySelector(".country2");
                    countryElement.textContent = "";

                    var subtitleElement = document.querySelector(".subtitle2");
                    subtitleElement.textContent = "weather on "+ inputDate +", "+ generalWeather;

                    var cityTemp = document.querySelector(".temperature2");
                    cityTemp.textContent = temp + "° C";
                    
                    var humidityEl = document.querySelector("#humidity2");
                    humidityEl.textContent = "humidity " + humidity + "%";

                    var WindEl = document.querySelector("#wind2");
                    WindEl.textContent = "Wind speed: "+ wind + " Km/h";
                    
                })



        })

        
}





function getDate(dateString){
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date(dateString);
    return `${days[d.getDay()]}, ${d.toLocaleTimeString('en-US', {hour: 'numeric', minute:'numeric'})}`;
}
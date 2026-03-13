const apikey = "eed5940b6739565e04ca0bfc99708e87";

const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", ()=>{
    const city = document.getElementById("city").value;
    if(city === ""){
        resultDiv.innerHTML = "Please enter a city name.";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.cod === "404"){
                resultDiv.innerHTML = "City not found";
                return;
            }
            
            const icon = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            const temperature = data.main.temp;
            const description  = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            resultDiv.innerHTML = `
            <h2>${data.name}</h3>
            <img src = "${iconUrl}">
            <h3>${temperature} °C</h3>
            <p> ${description}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed}m/s</p>
            `;
        })
        .catch(error =>{
            resultDiv.innerHTML = "Something went wrong";
            console.error(error);
        });
});

document.getElementById("city").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        searchBtn.click();
    }
})
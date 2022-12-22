const weather = {
  apiKey: "18a40f631ad8526afc3ce99ab0a78e1d",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((res) => res.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { description: desc, icon } = data.weather[0];
    const { speed } = data.wind;
    const { temp, humidity: humi } = data.main;
    document.querySelector(".city").innerHTML = "Weather in " + name;
    document.querySelector(".temp").innerHTML = temp + " &#176C";
    document
      .querySelector(".icon")
      .setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + icon + ".png"
      );
    document.querySelector(".description").innerHTML = desc;
    document.querySelector(".humidity").innerHTML = "Humidity: " + humi + "%";
    document.querySelector(".wind").innerHTML =
      "Wind Speed: " + speed + " km/h";

    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", () => {
  if (event.key == "Enter") weather.search();
});

document
  .getElementById("locationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const location = document.getElementById("locationInput").value;
    document.getElementById("loading").style.display = "block";

    try {
      const response = await fetch(
        `/api/weather?location=${encodeURIComponent(location)}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Network response was not ok");
      }
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      document.getElementById(
        "weatherInfo"
      ).innerHTML = `<p>Error: ${error.message}</p>`;
    } finally {
      document.getElementById("loading").style.display = "none";
    }
  });

function displayWeather(data) {
  const weatherInfoDiv = document.getElementById("weatherInfo");
  const currentConditions = data.currentConditions;
  weatherInfoDiv.innerHTML = `
      <h2>Current Weather</h2>
      <p>Temperature: ${currentConditions.temp}°C</p>
      <p>Conditions: ${currentConditions.conditions}</p>
      <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Color/${currentConditions.icon}.svg" alt="${currentConditions.conditions}">
  `;

  // Change background color based on weather conditions
  changeBackgroundColor(currentConditions.conditions);
}

function changeBackgroundColor(condition) {
  const body = document.body;
  switch (condition.toLowerCase()) {
    case "clear":
      body.style.backgroundColor = "#87CEEB"; // Light blue for clear sky
      break;
    case "partly cloudy":
      body.style.backgroundColor = "#ADD8E6"; // Light blue for partly cloudy
      break;
    case "cloudy":
      body.style.backgroundColor = "#D3D3D3"; // Light gray for cloudy
      break;
    case "rain":
      body.style.backgroundColor = "#AFEEEE"; // Pale turquoise for rain
      break;
    case "snow":
      body.style.backgroundColor = "#F0FFF0"; // Honeydew for snow
      break;
    default:
      body.style.backgroundColor = "#FFFFFF"; // White for unknown conditions
  }
}

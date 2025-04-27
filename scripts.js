// Grid List view
var li_links = document.querySelectorAll(".links ul li");
var view_wraps = document.querySelectorAll(".view_wrap");
var list_view = document.querySelector(".list-view");
var grid_view = document.querySelector(".grid-view");

li_links.forEach(function(link){
	link.addEventListener("click", function(){
		li_links.forEach(function(link){
			link.classList.remove("active");
		})

		link.classList.add("active");

		var li_view = link.getAttribute("data-view");

		view_wraps.forEach(function(view){
			view.style.display = "none";
		})

		if(li_view == "list-view"){
			list_view.style.display = "block";
		}
		else{
			grid_view.style.display = "block";
		}
	})
})

// charities event
document.addEventListener("DOMContentLoaded", function () {
    const extraDetails = {
        "Healing Hands Foundation": "Operates in over 15 rural areas. Volunteer-run since 2009.",
        "Bright Futures Initiative": "Provides scholarships to over 300 students annually.",
        "Green Earth Alliance": "Planted 500,000+ trees in the past 5 years."
    };

    document.querySelectorAll(".view_item h3").forEach(h3 => {
        const charityName = h3.textContent.trim();
        const tooltip = document.createElement("span");
        tooltip.className = "tooltip";
        tooltip.textContent = extraDetails[charityName] || "";
        h3.appendChild(tooltip);

        h3.addEventListener("mouseover", () => {
            tooltip.style.display = "inline";
        });

        h3.addEventListener("mouseout", () => {
            tooltip.style.display = "none";
        });
    });
});

// button hiden
var searchBtn = document.getElementById("hide-btn");
var searchBox = document.getElementById("volunteer-box");

searchBtn.onclick = function() {
	/*
	if(advancedSearchBox.style.display != "block"){
		advancedSearchBox.style.display = "block";
	}else{
		advancedSearchBox.style.display = "none";
	}*/

	searchBox.style.display = searchBox.style.display === "block" ? "none" : "block";
}


// date
window.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toLocaleDateString();
    const dateDiv = document.createElement("div");
    dateDiv.textContent = `🌍 Today is: ${today}`;
    dateDiv.style.textAlign = "center";
    dateDiv.style.margin = "10px 0";
    document.body.insertBefore(dateDiv, document.body.firstChild);
});


// api 
const apiKey = 'bd87b734e63aed0dd71c4e57611028be'; 

async function fetchWeather(city = 'Bogota') {
    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error('City not found.');
        }

        const data = await response.json();
        const container = document.querySelector('.weather-container');
        container.innerHTML = ''; 

        const forecastsByDay = {};
        data.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!forecastsByDay[date]) {
                forecastsByDay[date] = item;
            }
        });

        const forecastDays = Object.values(forecastsByDay).slice(0, 3);

        forecastDays.forEach(forecast => {
            const iconCode = forecast.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const card = document.createElement('div');
            card.className = 'weather-card';
            card.innerHTML = `
                <h3>${new Date(forecast.dt_txt).toLocaleDateString()}</h3>
                <img src="${iconUrl}" alt="Weather Icon" class="weather-icon">
                <p><strong>${forecast.main.temp}°C</strong></p>
                <p>${forecast.weather[0].description}</p>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    fetchWeather(); 

    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });
});

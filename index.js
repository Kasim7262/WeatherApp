const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
let errorContainer = document.querySelector(".error");


//default UI
let currentTab = userTab;
// const API_KEY = "30c905d79aee03d366f5f4e0a05799cd";
const API_KEY = "6f9397f637b39e3ce1a49fe05acffcac";
currentTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");


        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");

            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click",()=>{
    //pass click tab as input parameter 
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>{
    //pass click tab as input parameter
    switchTab(searchTab);
})

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    //make grant container invisible
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");

    // API call 
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
        // userInfoContainer.classList.remove("active");
        // errorContainer.classList.add("active");
        
        // console.log("Error Found",err);
        // let error = document.createElement('div');
        // let image = document.createElement('img');
        // image.src = `./assets/not-found.png`;
        // error.textContent = `Content Not Found - Error`;
    }
}


//function for coordinate present in session storage
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates)
    {
        //if local coordinates not fond
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinate = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinate);
    }
}



function renderWeatherInfo(weatherInfo){

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetching from weather info using json formatter and put in UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0].icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;


}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("No Geolocation support available");
        //check if thats true?
    }
}

function showPosition(position){

    const userCoordinates = {
        lat: position.coords.latitute,
        lon: position.coords.longitute,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}
const grantAccessBtn = document.querySelector("[data-grantAccess]");

grantAccessBtn.addEventListener("click",getLocation);


const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else
    fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{

        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);

    }
    catch(err){
        console.log("city not found", err);
    }

}
























console.log("Kasim");

function renderWeatherInfo1(data){
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;

    document.body.appendChild(newPara);
}

async function getWeatherDetails(){
    
    try{
        let city = 'goa';

        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let data = await response.json();

        console.log("Weather Data",data);

        renderWeatherInfo1(data);
    }
    catch(err){
        console.log("Error Found : ", err);
    }
}

async function getCustomWeather(){
    
    try{
        let lat = 15.496777;
        let lon = 73.827827;

        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        let data = await result.json();
        console.log(data);
    }

    catch(err){
        console.log("Error Found",err);
    }


}
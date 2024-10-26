const input = document.getElementById("searching");
const midEl = document.getElementById("midsection");
const lastEl = document.getElementById("lastsection");
const notfoundEl=document.getElementById("notfound");
const showContent=()=>{
    midEl.classList.add("mid");
    midEl.classList.remove("hide");
    lastEl.classList.add("lower");
    lastEl.classList.remove("hide");
    notfoundEl.classList.add("hide");
    notfoundEl.classList.remove("not_found");
}
const hideContent=()=>{
    midEl.classList.add("hide");
    midEl.classList.remove("mid");
    lastEl.classList.add("hide");
    lastEl.classList.remove("lower");
    notfoundEl.classList.add("not_found");
    notfoundEl.classList.remove("hide");
}
fetch("citiesPK.json")
    .then((res) => res.json())
    .then((values) => {
        const cArrary = values;

        input.addEventListener("keyup", () => {
            removeitems();
            for (let x of cArrary) {
                if (
                    x.name.toLowerCase().startsWith(input.value.toLowerCase()) &&
                    input.value != ""
                ) {
                    let listitem = document.createElement("li");
                    listitem.classList.add("list-item");
                    listitem.style.cursor = "pointer";
                    listitem.setAttribute("onclick", "displayNames('" + x.name + "')");
                    let matchedPart = x.name.substr(0, input.value.length);
                    let remainingPart = x.name.substr(input.value.length);

                    let word = `<b>${matchedPart}</b>${remainingPart}`;

                    listitem.innerHTML = word;

                    const ulEl = document.querySelector(".listing");
                    ulEl.appendChild(listitem);
                }
                // console.log(`${x.name},Punjab,Pakistan`);
            }
        });
    });
const removeitems = () => {
    const list_itemsEl = document.querySelectorAll(".list-item");
    list_itemsEl.forEach((value) => {
        value.remove();
    });
};
const displayNames = (str) => {
    input.value = str;
    removeitems();
};


const wetherUpdate=async (str)=>{
    const api="97f727634f9b09a37f5fc365c470d49a";
    const city=str;
    console.log(city);
    try {
        const res= await fetch(`https:api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`);
        const value= await res.json();
        if(value.cod=="404"){
            return "404";
        }
        console.log(value.weather[0].main);
        return value;
    } catch (error) {
        //console.error("Error fetching weather data:", error);
        return null;
    }
    
    
};

const searchbtn=document.getElementById("searchbtn");
searchbtn.addEventListener("click",async ()=>{
    
    if(input.value.trim()==""){
        console.log("hello");
    }else{
        let inputEl=input.value;
        if(inputEl.includes(",")){
            inputEl=inputEl.substr(0,inputEl.indexOf(","));
        }else{
            inputEl=inputEl;
        }
        const weatherdata= await wetherUpdate(inputEl);
        const cityimgEl=document.getElementById("cityimg");
        const citynameEl=document.getElementById("cityname");
        const citytempEl=document.getElementById("citytemp");
        const citywindEl=document.getElementById("citywind");
        const cityhumidityEl=document.getElementById("cityhumidity");
        if(weatherdata=="404"){
            hideContent();
            console.log("404 error aya hai");
        }else{
            showContent();
            console.log(weatherdata);
        console.log(weatherdata.weather[0].main);
        console.log(weatherdata.wind.speed);
        console.log(weatherdata.main.temp);
        console.log(weatherdata.main.humidity);
        const weatherimg=weatherdata.weather[0].main.toLowerCase();
        switch (weatherimg) {
            case "clear":
                cityimgEl.src="./Images/clear.png";
                break;
            case "clouds":
                cityimgEl.src="./Images/cloud.png";
                break;
            case "rain":
                cityimgEl.src="./Images/rain.png";
                break;
            case "thunderstorm":
                cityimgEl.src="./Images/rain.png";
                break;
            case "snow":
                cityimgEl.src="./Images/snow.png";
                break;
            case "mist":
                cityimgEl.src="./Images/mist.png";
                break;
            case "haze":
                cityimgEl.src="./Images/mist.png";
                break;
        
            default:
                cityimgEl.src="./Images/snow.png";
                break;
        }
        const temp=parseInt(weatherdata.main.temp);
        const wind=parseFloat(weatherdata.wind.speed);
        const humidi=parseInt(weatherdata.main.humidity);
        citynameEl.innerText=inputEl;
        citytempEl.innerHTML=`<p class="temp_p" id="citytemp">${temp}<span>°C</span></p>`;
        citywindEl.innerHTML= `<p id="citywind">${wind}<span> Km/h</span></p>`;
        cityhumidityEl.innerHTML=`<p id="cityhumidity">${humidi}<span> %</span></p>`;
    
        }
    }
})
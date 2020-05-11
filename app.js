let input = document.querySelector('input');
let button = document.querySelector('button');
let para = document.querySelector('p');
button.addEventListener('click',searchWeather);

// API call using async and await
function searchWeather(){
    async function loadData(){
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=imperial&appid=4f1e907809a39e082204012852f57934`,
        {mode: 'cors'});
        let myData = await response.json();
        let main = {
            "Temp": myData.main.temp,
            "Feels Like": myData.main.feels_like,
            "High": myData.main.temp_max,
            "Low": myData.main.temp_min,
        }
        return {
            name: myData.name,
            desc: myData.weather[0].description,
            main: main,
        };
    }

    // mainData stores all relevant data
    let mainData = loadData()
    mainData.then((data) => displayInfo(data))
    .catch(() => para.innerText = "Invalid city name.");

    function displayInfo(data){
        console.log(data);
        input.value = "";
        para.innerText = "City Name: " + data.name + "\n";
        para.innerText += "Description: " + data.desc + "\n";
        for(let prop in data.main){
            para.innerText += prop + ": " + data.main[prop] + "F\n";
        }
    }
}
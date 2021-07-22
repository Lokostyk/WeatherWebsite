const everyVoivodship = [{id:3099434},{id:3080165},{id:3083829},{id:3090104},{id:3102014},
{id:776069},{id:765876},{id:3088171},{id:6695624},{id:3093133},{id:3081368},
{id:3090048},{id:3096472},{id:769250},{id:3094802},{id:7530819}]
const btn = document.querySelector(".menu-btn")

btn.addEventListener("click",function(btn){
    const btnBars = document.querySelectorAll(".element")
    const menuContent = document.querySelector(".nav_wrapper")
    menuContent.classList.toggle("appear")
    btnBars.forEach(function(bar){
        bar.classList.toggle("xbtn")
    })
})
//Creating map
let mymap = L.map('weatherMap', {
        center: [52.03760, 19.14508],
        zoom: 7,
    });
L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Sekg3u0v8tQK6BjV6BT8', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);


async function mapData(id){
    //Fetching weather data
    const req = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=84e33ebdc522895f1fac6dfc02b36df8&units=metric`)
    const json = JSON.parse(await req.text())
    //Creating icons with temperature on map
    const temp = Math.round(json.list[0].main.temp)
    const coords = json.city.coord
    const marker = L.marker([coords.lat, coords.lon],{
        icon: L.divIcon({
            html: `<img src='http://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@2x.png' class="weatherIcon">
            <span class='weatherText'>${temp}°C\n</span>`
        })
    })
    marker.bindTooltip(`${json.city.name}`)
    marker.addTo(mymap)
    
    //Adding interactive list of cities
    const listElement = document.createElement("button")
    listElement.setAttribute("class","btn")
    listElement.innerHTML = `${json.city.name}`
    document.querySelector(".list").appendChild(listElement)
    listElement.addEventListener("click",function(){
        mymap.flyTo([coords.lat, coords.lon], 10, {
            animate: true,
            duration: 1
          })
    })
}
everyVoivodship.forEach(async x => mapData(x.id))
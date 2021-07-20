const everyVoivodship = [{voi:"Pomorskie",id:3099434},{voi:"Lubuskie",id:3080165},{voi:"Zachodnio-pomorskie",id:3083829},{voi:"Warmińsko-mazurskie",id:3090104},{voi:"Kujawsko-pomorskie",id:3102014},
{voi:"Podlaskie",id:776069},{voi:"Lubelskie",id:765876},{voi:"Wielkopolskie",id:3088171},{voi:"Mazowieckie",id:6695624},{voi:"Łódzkie",id:3093133},{voi:"Dolnośląskie",id:3081368},
{voi:"Opolskie",id:3090048},{voi:"Śląskie",id:3096472},{voi:"Świętokrzyskie",id:769250},{voi:"Małopolskie",id:3094802},{voi:"Podkarpackie",id:7530819}]

let mymap = L.map('weatherMap', {
        center: [52.03760, 19.14508],
        zoom: 7,
    });

L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Sekg3u0v8tQK6BjV6BT8', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);


async function mapData(id){
    const req = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=84e33ebdc522895f1fac6dfc02b36df8&units=metric`)
    const json = JSON.parse(await req.text())

    const temp = Math.round(json.list[0].main.temp)
    const coords = json.city.coord

    L.marker([coords.lat, coords.lon],{
        icon: L.divIcon({
            html: `<img src='http://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@2x.png' class="weatherIcon"><span class='weatherText'>${temp}°C
            </span>`
        })
    }).addTo(mymap)
}
everyVoivodship.forEach(async x => mapData(x.id))

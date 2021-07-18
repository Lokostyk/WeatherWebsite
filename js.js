const everyVoivodship = [{voi:"Pomorskie",id:3099434},{voi:"Lubuskie",id:3080165},{voi:"Zachodnio-pomorskie",id:3083829},{voi:"Warmińsko-mazurskie",id:3090104},{voi:"Kujawsko-pomorskie",id:3102014},
{voi:"Podlaskie",id:776069},{voi:"Lubelskie",id:765876},{voi:"Wielkopolskie",id:3088171},{voi:"Mazowieckie",id:6695624},{voi:"Łódzkie",id:3093133},{voi:"Dolnośląskie",id:3081368},
{voi:"Opolskie",id:3090048},{voi:"Śląskie",id:3096472},{voi:"Świętokrzyskie",id:769250},{voi:"Małopolskie",id:3094802},{voi:"Podkarpackie",id:7530819}]
const voivodshipData = []

async function mapData(){
    const req = await fetch("https://api.openweathermap.org/data/2.5/forecast?id=3099434&appid=84e33ebdc522895f1fac6dfc02b36df8&units=metric")
    const json = JSON.parse(await req.text())
    voivodshipData.push({temp:Math.round(json.list[0].main.temp),coord:json.city.coord})
}
mapData()
console.log(voivodshipData)
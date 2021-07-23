const everyVoivodship = [{id:3099434},{id:3080165},{id:3083829},{id:3090104},{id:3102014},
    {id:776069},{id:765876},{id:3088171},{id:6695624},{id:3093133},{id:3081368},
    {id:3090048},{id:3096472},{id:769250},{id:3094802},{id:7530819}]
const main = document.querySelector(".con")

function createChart(data,id,mHours){
    let ctx = document.getElementById(`${id}`).getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mHours,
            datasets: [{
                label: 'Temperature in °C',
                data: data,
                backgroundColor: [
                    'rgb(56, 56, 245,.9)'
                ],
                borderColor: [
                    "blue"
                ],
                borderWidth: 1
            }],
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        callback: function(value, index, values) {
                            return Math.round(value*100)/100+"°";
                        }
                    }
                }
            }
        }
    });
}
async function mapData(id){
    //Fetching weather data
    const req = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=84e33ebdc522895f1fac6dfc02b36df8&units=metric`)
    const json = JSON.parse(await req.text())

    //Acquiring temperature data
    const tempFor5Days = []
    const measurementHours = []
    for(let i of json.list){
        tempFor5Days.push(i.main.temp)
        measurementHours.push(i.dt_txt.slice(-8,-3).trim())
    }

    //Creating tile with chart
    const charBlock = document.createElement("div")
    charBlock.setAttribute("class","chart_container")
    charBlock.innerHTML = `
        <h2 class="chart_title">${json.city.name}<h2>
        <canvas id="${id}" class="chart"></canvas>`
    main.appendChild(charBlock)
    createChart(tempFor5Days,id,measurementHours)

}
everyVoivodship.forEach(async x => mapData(x.id))

//Mobile menu button
const btn = document.querySelector(".menu-btn")

btn.addEventListener("click",function(btn){
    const btnBars = document.querySelectorAll(".element")
    const menuContent = document.querySelector(".nav_wrapper")
    menuContent.classList.toggle("appear")
    btnBars.forEach(function(bar){
        bar.classList.toggle("xbtn")
    })
})
const everyVoivodship = [{id:3099434},{id:3080165},{id:3083829},{id:757357},{id:3102014},
    {id:776069},{id:765876},{id:3088171},{id:6695624},{id:3093133},{id:3081368},{id:3095049},
    {id:3090048},{id:3096472},{id:769250},{id:3094802},{id:7530819},{id:763166},{id:3081741},{id:759412}]
const main = document.querySelector(".con")
const arrowBtn = document.querySelector(".right_corner_button")
let i = 0

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
    charBlock.setAttribute("id",`${id}x`)
    charBlock.innerHTML = `
        <h2 class="chart_title">${json.city.name}<h2>
        <canvas id="${id}" class="chart"></canvas>`
    main.appendChild(charBlock)
    createChart(tempFor5Days,id,measurementHours)

    //Filling left menu list
    const containerOne = document.querySelector(".container_one")
    const containerTwo = document.querySelector(".container_two")
    const listElement = document.createElement("a")
    listElement.setAttribute("href",`#${id}x`)
    listElement.textContent = json.city.name
    if(i < 10){
        containerOne.appendChild(listElement)
    }else{
        containerTwo.appendChild(listElement)
    }
    i++
}
everyVoivodship.forEach(async x => mapData(x.id))

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
//Right corner menu btn/list
arrowBtn.addEventListener("click",function(btn){
    const btnClasses = btn.currentTarget.classList.value
    const containerOne = document.querySelector(".container_one").classList
    const containerTwo = document.querySelector(".container_two").classList
    
    if(!btnClasses.includes("transition_one") && !btnClasses.includes("transition_two")){
        btn.currentTarget.classList.add("transition_one")

        document.querySelector(".container_wrapper").classList.add("container_list_appear")
        containerOne.remove("container_one_disappear")
        if(containerTwo.contains("container_two_appear")){
            containerTwo.add("display_none")
            containerTwo.remove("container_two_appear")
        }
    }else if(btnClasses.includes("transition_one") && !btnClasses.includes("transition_two")){
        btn.currentTarget.classList.remove("transition_one")
        btn.currentTarget.classList.add("transition_two")

        containerTwo.remove("display_none")
        containerOne.add("container_one_disappear")
        containerTwo.add("container_two_appear")

    }else{
        btn.currentTarget.classList.remove("transition_two")

        document.querySelector(".container_wrapper").classList.remove("container_list_appear")
    }
})

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
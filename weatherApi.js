const apiKey ='8ccb4c7cad19db6db966e777721b6136';
var inputLocation = document.getElementById('input');

var output = document.querySelector('#output');

function getWeather(){
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputLocation.value}&appid=${apiKey}`).then(res=>{
  return res.json();
}).then(data=>{
  output.innerHTML+=`
   <div class='card border border-primary p-3 m-2'>
   <h4 class='border-bottom'>${data.name} ${data.sys.country}</h4>
   <p>Humidity : ${data.main.humidity}<p>
   <p>Temperature : ${data.main.temp}<p> 
   <p>Pressure : ${data.main.pressure}<p>
   <p>Weather : ${data.weather[0].description}<p>        
   </div>
  `;
  console.log(inputLocation);
});
}

const myBtn = document.querySelector('#inputBtn');
myBtn.addEventListener('click', function () {
  // event.preventDefault();
  console.log(inputLocation.value)
  getWeather();
})



const cityForm = document.querySelector('form');
const card=document.querySelector('.card');
const details = document.querySelector('.details');
const time= document.querySelector('img.time');
const icon =document.querySelector('.icon img');


//ui update

const updateUI= (data) => {

  // const cityDets= data.cityDets;
  // const weather= data.weather;

//destructure properties

const {cityDets, weather}=data;



  details.innerHTML =`
  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg; C</span>
  </div>
  `;
const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
icon.setAttribute('src',iconSrc);


  let timeSrc=null;
  if(weather.isDayTime){
    timeSrc='img/a.svg'
  }else {
    timeSrc='img/b.svg'
  }
  time.setAttribute('src',timeSrc)

  if(card.classList.contains('d-none')){
    card.classList.remove('d-none')
  }
}



const updateCity = async (city) =>{
 

  const cityDets =await getCity(city);
  const weather= await getweather(cityDets.Key);


  return{
    cityDets,
    weather
  }


}


cityForm.addEventListener('submit', (e) =>{

//get city value
const city= cityForm.city.value.trim();
cityForm.reset();


//update the ui with new city
updateCity(city)
.then(data => updateUI(data))
.catch(err => console.log(err))


  e.preventDefault();
})
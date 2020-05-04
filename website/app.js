//API Key
const apiKey = "62fa906e7367e8a40dd766e9eb5a1d0b";

let d = new Date();
let month = d.getMonth() + 1;
let newDate = d.getDate() + '/' + month + '/' + d.getFullYear();


const constructApiUrl = (zipCode, countryCode) => {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&units=metric&appid=${apiKey}`;
  return apiUrl;
};

//get data from api
const getDataFromApi = async () => {
  const res = await fetch(constructApiUrl("37138", "IT"));
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const getCurrentData = async () => {
  const res = await fetch('http://localhost:8000/getData');
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
}



getDataFromApi().then((data) => {
  // console.log(`The temperature in ${data.name} is: ${data.main.temp}!
  // Outside is ${data.weather.main} and the sunrise will be at ${data.sys.sunrise}`);
  const weather = { city: data.name, temperature: data.main.temp };
  console.log(weather)
});

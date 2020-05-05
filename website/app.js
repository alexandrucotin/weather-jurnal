//API Key
const apiKey = "62fa906e7367e8a40dd766e9eb5a1d0b";

//button id
const button = document.getElementById("submit");

//date
let date = new Date();
let newDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

//get data from api
const getDataFromApi = async (zipCode, countryCode) => {
  const res = await fetch(
    //changed to celcius (im from Italy)
    `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&units=metric&appid=${apiKey}`
  );
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const getCurrentData = async () => {
  const res = await fetch("http://localhost:8000/getData");
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const postData = async (url = "", data = {}) => {
  console.log("data that IS in postData: ", data);
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const submit = async () => {
  const countryCode = document.getElementById("country-code").value;
  const zipCode = document.getElementById("zip-code").value;
  const feelings = document.getElementById("feelings").value;
  getDataFromApi(zipCode, countryCode)
    .then((data) => {
      const element = {
        date: newDate,
        city: data.name,
        weather: data.weather[0].description,
        temperature: data.main.temp,
        feelings: feelings,
      };
      postData("/insertData", element);
    })
    .then(() => {
      updateUI();
    });
};

const updateUI = async () => {
  const res = await fetch("/getData");
  try {
    const data = await res.json();
    console.log("data in the updateUI is: ", data);
    console.log(data.feelings);
    document.getElementById("date").textContent = data.date;
    document.getElementById("city").textContent = data.city;
    document.getElementById("weather").textContent = data.weather;
    document.getElementById("temperature").textContent = data.temperature;
    document.getElementById("content").textContent = data.feelings;
  } catch (err) {
    console.log("error", err);
  }
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  submit();
});

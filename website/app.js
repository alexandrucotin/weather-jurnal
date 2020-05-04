//API Key
const apiKey = "62fa906e7367e8a40dd766e9eb5a1d0b";

//button id
const button = document.getElementById("submit");

//get data from api
const getDataFromApi = async (zipCode, countryCode) => {
  const res = await fetch(
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
  console.log(res);
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

async function submit() {
  const countryCode = document.getElementById("country-code").value;
  const zipCode = document.getElementById("zip-code").value;
  const feelings = document.getElementById("feelings").value;
  getDataFromApi(zipCode, countryCode).then((data) => {
    const element = {
      city: data.name,
      temperature: data.main.temp,
      feelings: feelings,
    };
    // console.log(element);
    postData("/insertData", element);
  });

  updateUI();
}

const updateUI = async () => {
  const req = await fetch("/getData");
  try {
    const data = await req.json();
    console.log(data);
    document.getElementById("city").textContent = data.city;
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

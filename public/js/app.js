const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");

const getWeather = location => {
  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        message1.innerText = "Error fetching the data";
      } else {
        message1.innerText = "Place: " + data.place;
        message2.innerText = "Summary: " + data.summary;
      }
    });
  });
};

weatherForm.addEventListener("submit", event => {
  event.preventDefault();
  const location = input.value;
  message1.innerText = "Loading.....";
  message2.innerText = "";
  getWeather(location);
});

const tickerOne = document.querySelector("#ticker1");
const tickerTwo = document.querySelector("#ticker2");
let urlHNMaxId = "https://hacker-news.firebaseio.com/v0/maxitem.json?";
let maxId = "";
let urlHNLatest = "https://hacker-news.firebaseio.com/v0/item/16057062.json?";
const newsButton = document.querySelector("#newsBtn");

newsButton.addEventListener('click', sendMaxIdRequest);

function sendMaxIdRequest() {
  axios.get(urlHNMaxId)
       .then(getMaxId)
       .catch(maxIdErrors);
}

function getMaxId(response) {
  maxId = response.data;
  axios.get(urlHNLatest)
  .then(updateTicker)
  .catch(tickerErrors);
}

function maxIdErrors(error) {
  if (error.response) {
    alert("Problem with response", error.response.status);
  } else if (error.request) {
    alert("Problem with request", error.request.status);
  } else {
    alert("Error", error.message);
  }
}

function updateTicker(response) {
    tickerOne.innerHTML = response.data.text;
}

function tickerErrors(error) {
    if (error.response) {
      alert("Problem with response", error.response.status);
    } else if (error.request) {
      alert("Problem with request", error.request.status);
    } else {
      alert("Error", error.message);
    }
  }

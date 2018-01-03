const tickerOne = document.querySelector("#ticker1");
const tickerTwo = document.querySelector("#ticker2");
let urlHNMaxId = "https://hacker-news.firebaseio.com/v0/maxitem.json?";
let maxId = 0;
let counter = 0;
let newsStories = 5;
let urlHNLatest = '';
const newsButton = document.querySelector("#newsBtn");

newsButton.addEventListener('click', sendMaxIdRequest);

function sendMaxIdRequest() {
  axios.get(urlHNMaxId)
       .then(getMaxId)
       .catch(maxIdErrors);
}

function getMaxId(response) {
  maxId = response.data - counter;
  maxId = maxId.toString();
  urlHNLatest = "https://hacker-news.firebaseio.com/v0/item/" + maxId + ".json?";
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
    console.log('Response is: ' + response.data.type);
    console.log(maxId);
    if (newsStories > 0) {
        if(response.data.type == 'story') {
            tickerOne.innerHTML = response.data.title;
            newsStories--;
            console.log('newsStories: ' + newsStories);
            counter++;
            sendMaxIdRequest();
        } else {
            counter++;
            sendMaxIdRequest();
        }
    }
}

function updateLoop() {
    axios.get(urlHNLatest)
    .then(updateTicker)
    .catch(tickerErrors);
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

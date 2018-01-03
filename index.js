let urlHNMaxId = "https://hacker-news.firebaseio.com/v0/maxitem.json?";
let maxId = 0;
let counter = 0;
let newsStories = 0;
let urlHNLatest = '';
let newSpan = document.createElement('span');
const tickerContainer = document.querySelector('.ticker-container');
const newsButton = document.querySelector("#newsBtn");

newsButton.addEventListener('click', sendMaxIdRequest);
newsButton.addEventListener('click', function(){
    if (newsStories > 0) {
        newsStories = 0;
        counter = 0;
        let child0 = document.getElementById('ticker0');
        let child1 = document.getElementById('ticker1');
        let child2 = document.getElementById('ticker2');
        let child3 = document.getElementById('ticker3');
        let child4 = document.getElementById('ticker4');
        tickerContainer.removeChild(child0);
        tickerContainer.removeChild(child1);
        tickerContainer.removeChild(child2);
        tickerContainer.removeChild(child3);
        tickerContainer.removeChild(child4);

        /*
        let spans = tickerContainer.getElementsByTagName('span');
        let spansLength = spans.length;
        let spanCounter = 0;
        while (spanCounter < 5) {
            tickerContainer.removeChild(spans[spanCounter]);
            spanCounter++;
        }
        */

    }
});

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
    if (newsStories < 5) {
        if(response.data.type == 'story' && response.data.deleted != true) {
            console.log('newsStories: ' + newsStories);
            console.log(tickerContainer.childElementCount);
            createSpan();
            tickerContainer.appendChild(newSpan).innerHTML = response.data.title;
            console.log(response.data.title);
            tickerContainer.getElementsByTagName('span')[newsStories].className = 'ticker';
            tickerContainer.getElementsByTagName('span')[newsStories].id = 'ticker' + [newsStories];
            newsStories++;
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

  function createSpan() {
    newSpan = document.createElement('span');
  }

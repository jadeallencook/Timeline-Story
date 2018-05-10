new Promise(function (res, rej) {
  var request = new XMLHttpRequest;
  request.onload = function () {
    res(JSON.parse(this.response));
  }
  request.open('get', 'data/ancestry-2.json');
  request.send();
}).then(function (data) {
  var timelineInfo = data;
  var timelineDates = document.getElementsByClassName('timeline-date'),
    currentDate = 0;
  var timelineLineContainer = document.getElementById('timeline-line-container'),
    timelineDate = document.getElementById('timeline-date'),
    timelineText = document.getElementById('timeline-text');
  for (var x = 0, max = timelineInfo.length; x < max; x++) {
    var classes;
    if (timelineInfo[x].highlight) classes = 'timeline-date highlight';
    else  classes = 'timeline-date';
    timelineLineContainer.innerHTML += '<div class="' + classes + '" id="timeline-story-' + x + '"></div>';
    if (x !== (max - 1)) timelineLineContainer.innerHTML += '<div class="timeline-line"></div>';
  }
  function displayDate(num) {
    var date = timelineInfo[num];
    timelineText.innerText = date.text;
    if (date.image) timelineText.innerHTML += '<img src="' + date.image + '" />';
    timelineDate.innerText = date.year;
    for (var x = 0, max = timelineDates.length; x < max; x++) {
      var elem = timelineDates[x];
      elem.style.backgroundColor = '#000';
    }
    document.getElementById('timeline-story-' + num).style.backgroundColor = '#777';
  }
  for (var x = 0, max = timelineDates.length; x < max; x++) {
    var date = timelineDates[x];
    date.addEventListener('click', function () {
      clearInterval(autoplay);
      var id = parseInt(this.id.replace('timeline-story-', ''));
      displayDate(id);
    });
  }
  displayDate(currentDate);
  var autoplay = setInterval(function () {
    if (currentDate === timelineDates.length - 1) currentDate = 0;
    else currentDate++;
    displayDate(currentDate);
  }, 3000);
});
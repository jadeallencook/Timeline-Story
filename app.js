var Timeline = function (container, json, height) {
  new Promise(function (res, rej) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        json = JSON.parse(this.responseText);
        res();
      }
    }
    request.open('get', json)
    request.send();
  }).then(function () {
    container.style.height = height + 'px';
    var headerTitle = document.createElement('h2');
    headerTitle.innerText = json.title;
    headerTitle.classList.add('header-title');
    container.appendChild(headerTitle);
    var headerDescription = document.createElement('span');
    headerDescription.innerText = json.description;
    container.appendChild(headerDescription);
    function buildDate(selected, num) {
      var bubbleElems = container.querySelectorAll('div.dot');
      for (var x = 0; x < bubbleElems.length; x++) {
        bubbleElems[x].style.backgroundColor = 'white';
      }
      container.querySelector('h2.timeline-date').innerText = selected.year;
      container.querySelector('div[data-num="' + num + '"]').style.backgroundColor = json.color;
      container.querySelector('span.timeline-description').innerText = selected.text;
      if (selected.image) {
        container.querySelector('img.timeline-image').setAttribute('src', selected.image);
        container.querySelector('img.timeline-image').style.display = 'block';
        container.querySelector('span.image-caption').innerText = selected.caption;
        container.querySelector('span.image-caption').style.display = 'block';
      } else {
        container.querySelector('img.timeline-image').style.display = 'none';
        container.querySelector('span.image-caption').style.display = 'none';
      }
    }
    var timelineContainer = document.createElement('div');
    timelineContainer.classList.add('timeline-container');
    var timelineDate = document.createElement('h2');
    timelineDate.classList.add('timeline-date');
    timelineContainer.appendChild(timelineDate);
    var timelineGrid = document.createElement('div');
    timelineGrid.classList.add('timeline');
    var gridTemplateColumns = '';
    for (var x = 0; x < json.data.length; x++) {
      var time = json.data[x];
      gridTemplateColumns += '1fr ';
      var timelineSpot = document.createElement('div');
      timelineSpot.classList.add('timeline-spot');
      var dot = document.createElement('div');
      if (time.highlight) dot.classList.add('large');
      dot.classList.add('dot');
      dot.setAttribute('data-num', x);
      dot.onclick = function () {
        var num = parseInt(this.getAttribute('data-num'));
        var selected = json.data[num];
        buildDate(selected, num);
        clearInterval(autoTimeline);
      }
      var line = document.createElement('div');
      line.classList.add('line');
      if (x === json.data.length - 1) line.style.width = '25%';
      if (json.color) {
        dot.style.borderColor = json.color;
        line.style.backgroundColor = json.color;
      }
      timelineSpot.appendChild(line);
      timelineSpot.appendChild(dot);
      timelineGrid.appendChild(timelineSpot);
    }
    timelineGrid.style.gridTemplateColumns = gridTemplateColumns;
    timelineContainer.appendChild(timelineGrid);
    var timelineDescription = document.createElement('span');
    timelineDescription.classList.add('timeline-description');
    timelineDescription.innerText = 'loading...';
    timelineContainer.appendChild(timelineDescription);
    var timelineImage = document.createElement('img');
    timelineImage.classList.add('timeline-image');
    timelineImage.style.display = 'none';
    timelineContainer.appendChild(timelineImage);
    var imageCaption = document.createElement('span');
    imageCaption.classList.add('image-caption');
    imageCaption.style.display = 'none';
    timelineContainer.appendChild(imageCaption);
    container.appendChild(timelineContainer);
    buildDate(json.data[0], 0);
    var currentTime = 0;
    var autoTimeline = setInterval(function () {
      if (currentTime === json.data.length - 1) currentTime = 0;
      else currentTime++;
      buildDate(json.data[currentTime], currentTime);
    }, 2000);
  });
}

new Timeline(document.getElementById('timeline-1'), 'data/ancestry-2.json', 650);
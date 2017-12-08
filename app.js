(function () {
  // build data
  var timelineInfo = [{
    year: '270 AD',
    text: 'Nicholas born in Asia Minor.'
  }, {
    year: '300 AD',
    text: 'Nicholas became the bishop of Myra, the city that is now Demre, Turkey.'
  }, {
    year: '343 AD',
    text: 'Bishop Nicholas dies on Dec. 6 and is buried in Demre.'
  }, {
    year: 1087,
    text: 'The bones of St. Nicholas are moved to Bari, Italy.'
  }, {
    year: 1100,
    text: 'Recalling Nicholas’s compassion and generosity, French nuns began giving gifts to needy children on Dec. 6, the saint’s feast day.'
  }, {
    year: 1809,
    text: 'American author Washington Irving describes Nicholas as a pipe-smoking elf in his satirical "Knickerbocker’s History of New York".'
  }, {
    year: 1823,
    text: 'Clement Clarke Moore published "A Visit from St. Nicholas," giving the "jolly old elf" a miniature sleigh and eight tiny reindeer.'
  }, {
    year: 1863,
    text: 'Political cartoonist Thomas Nast began drawing Santa Claus for Harper’s Weekly. His first sketch showed Santa handing out gifts to Union troops.'
  }, {
    year: 1931,
    text: 'Santa first appears in a Coca-Cola ad, having gained a significant amount of weight since Nast first drew him.'
  }, {
    year: 2017,
    text: 'Archeologists in Turkey say they\'ve found St. Nicholas\' real tomb. Carol Myers of The St. Nicholas Center calls speculation "very premature."'
  }];
  var timelineDates = document.getElementsByClassName('timeline-date'),
  currentDate = 0;
  // cache dom elements
  var timelineLineContainer = document.getElementById('timeline-line-container'),
    timelineDate = document.getElementById('timeline-date'),
    timelineText = document.getElementById('timeline-text');
  // build timeline
  for (var x = 0, max = timelineInfo.length; x < max; x++) {
    timelineLineContainer.innerHTML += '<div class="timeline-date" id="timeline-story-' + x + '"></div>';
    if (x !== (max - 1)) timelineLineContainer.innerHTML += '<div class="timeline-line"></div>';
  }
  // display specific date
  function displayDate(num) {
    var date = timelineInfo[num];
    timelineText.innerText = date.text;
    timelineDate.innerText = date.year;
    for (var x = 0, max = timelineDates.length; x < max; x++) {
      var elem = timelineDates[x];
      elem.style.backgroundColor = '#000';
    }
    document.getElementById('timeline-story-' + num).style.backgroundColor = '#777';
  }
  // add event listeners to all timeline dates
  for (var x = 0, max = timelineDates.length; x < max; x++) {
    var date = timelineDates[x];
    date.addEventListener('click', function() {
      clearInterval(autoplay);
      var id = parseInt(this.id.replace('timeline-story-', ''));
      displayDate(id);
    });
  }
  // init timeline
  displayDate(currentDate);
  // start autoplay
  var autoplay = setInterval(function() {
    if (currentDate === timelineDates.length - 1) currentDate = 0;
    else currentDate++;
    displayDate(currentDate);
  }, 3000);
})();
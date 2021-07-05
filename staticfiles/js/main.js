(function () {
  // Vertical Timeline - by CodyHouse.co
  function VerticalTimeline(element) {
    this.element = element;
    this.blocks = this.element.getElementsByClassName("cd-timeline__block");
    this.images = this.element.getElementsByClassName("cd-timeline__img");
    this.contents = this.element.getElementsByClassName("cd-timeline__content");
    this.offset = 0.8;
    this.hideBlocks();
  }

  VerticalTimeline.prototype.hideBlocks = function () {
    if (!"classList" in document.documentElement) {
      return; // no animation on older browsers
    }
    //hide timeline blocks which are outside the viewport
    var self = this;
    for (var i = 0; i < this.blocks.length; i++) {
      (function (i) {
        if (
          self.blocks[i].getBoundingClientRect().top >
          window.innerHeight * self.offset
        ) {
          self.images[i].classList.add("cd-timeline__img--hidden");
          self.contents[i].classList.add("cd-timeline__content--hidden");
        }
      })(i);
    }
  };

  VerticalTimeline.prototype.showBlocks = function () {
    if (!"classList" in document.documentElement) {
      return;
    }
    var self = this;
    for (var i = 0; i < this.blocks.length; i++) {
      (function (i) {
        if (
          self.contents[i].classList.contains("cd-timeline__content--hidden") &&
          self.blocks[i].getBoundingClientRect().top <=
          window.innerHeight * self.offset
        ) {
          // add Ounce-in animation
          self.images[i].classList.add("cd-timeline__img--bounce-in");
          self.contents[i].classList.add("cd-timeline__content--bounce-in");
          self.images[i].classList.remove("cd-timeline__img--hidden");
          self.contents[i].classList.remove("cd-timeline__content--hidden");
        }
      })(i);
    }
  };

  var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
    verticalTimelinesArray = [],
    scrolling = false;
  if (verticalTimelines.length > 0) {
    for (var i = 0; i < verticalTimelines.length; i++) {
      (function (i) {
        verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
      })(i);
    }

    //show timeline blocks on scrolling
    window.addEventListener("scroll", function (event) {
      if (!scrolling) {
        scrolling = true;
        !window.requestAnimationFrame ?
          setTimeout(checkTimelineScroll, 250) :
          window.requestAnimationFrame(checkTimelineScroll);
      }
    });
  }

  function checkTimelineScroll() {
    verticalTimelinesArray.forEach(function (timeline) {
      timeline.showBlocks();
    });
    scrolling = false;
  }
})();



$(document).ready(function () {

  let loading = $('.loading').wrapInner('<div></div>'),
    min = 20,
    max = 70,
    minMove = 10,
    maxMove = 20;

  startAnimation(loading);

  loading.on('animationend webkitAnimationEnd oAnimationEnd', 'span:last-child', e => {
    startAnimation(loading);
  });

  //Set CSS vars & generate spans if needed
  function setCSSVars(elem, min, max, minMove, maxMove) {
    let width = Math.ceil(elem.width()),
      text = elem.text();
    for (let i = 1; i < width; i++) {
      let num = Math.floor(Math.random() * (max - min + 1)) + min,
        numMove = Math.floor(Math.random() * (maxMove - minMove + 1)) + minMove,
        dir = (i % 2 == 0) ? 1 : -1,
        spanCurrent = elem.find('span:eq(' + i + ')'),
        span = spanCurrent.length ? spanCurrent : $('<span />');
      span.css({
        '--x': i - 1 + 'px',
        '--move-y': num * dir + 'px',
        '--move-y-s': ((i % 2 == 0) ? num * dir - numMove : num * dir + numMove) + 'px',
        '--delay': i * 10 + 'ms'
      });
      if (!spanCurrent.length) {
        elem.append(span.text(text));
      }
    }
  }

  //Start animation
  function startAnimation(elem) {
    elem.removeClass('start');
    setCSSVars(elem, min, max, minMove, maxMove);
    void elem[0].offsetWidth;
    elem.addClass('start');
  }

});



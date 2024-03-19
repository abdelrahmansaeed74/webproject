(function ($) {
  // Define slide function
  var slide = function (ele, options) {
    // Convert DOM element to a jQuery obj
    var $ele = $(ele);
    // Default
    var setting = {
      speed: 1000, // animation duration (ms)
      interval: 2000, // Interval between slide transitions (ms)
    };
    // Merge default options with user-defined options
    $.extend(true, setting, options);
    //CSS properties for each slide
    var states = [
      { $zIndex: 1, width: 120, height: 150, top: 69, left: 134, $opacity: 1 },
      { $zIndex: 2, width: 130, height: 170, top: 59, left: 0, $opacity: 1 },
      { $zIndex: 3, width: 170, height: 218, top: 35, left: 110, $opacity: 1 },
      { $zIndex: 4, width: 224, height: 288, top: 0, left: 263, $opacity: 1 },
      { $zIndex: 3, width: 170, height: 218, top: 35, left: 470, $opacity: 1 },
      { $zIndex: 2, width: 130, height: 170, top: 59, left: 620, $opacity: 1 },
      { $zIndex: 1, width: 120, height: 150, top: 69, left: 500, $opacity: 1 },
    ];

    // Select all <li> elements within the slider container
    var $lis = $ele.find("li");
    // Initialize the timer
    var timer = null;

    // Add click event handler for NEXT btn
    $ele.find(".hi-next").on("click", function () {
      next();
    });
    // Add click event handler for PREV btn
    $ele.find(".hi-prev").on("click", function () {
      states.push(states.shift());
      move();
    });
    // Pause autoplay on mouseenter and resume on mouseleave
    $ele
      .on("mouseenter", function () {
        clearInterval(timer);
        timer = null;
      })
      .on("mouseleave", function () {
        autoPlay();
      });

    move();
    autoPlay();
    // Function to transition between slides
    function move() {
      $lis.each(function (index, element) {
        var state = states[index];
        $(element)
          .css("zIndex", state.$zIndex)
          .finish()
          .animate(state, setting.speed)
          .find("img")
          .css("opacity", state.$opacity);
      });
    }
    // Function to transition to the next slide
    function next() {
      states.unshift(states.pop());
      move();
    }
    function autoPlay() {
      timer = setInterval(next, setting.interval);
    }
  };
  // Define hiSlide jQuery plugin
  $.fn.hiSlide = function (options) {
    // Iterate over each element in the jQuery collection
    $(this).each(function (index, ele) {
      // Call slide fn on each element
      slide(ele, options);
    });
    // Return jQuery obj for method chaining
    return this;
  };
})(jQuery);

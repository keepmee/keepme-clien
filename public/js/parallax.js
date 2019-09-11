(function ($) {

  $.fn.parallax = function (parallaxAmp = 1.3) {
    let window_width = $(window).width();
    // Parallax Scripts
    return this.each(function (i) {
      let $this = $(this);
      $this.addClass('parallax');

      function updateParallax(initial) {
        let container_height;
        if (window_width < 601) {
          container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height();
        }
        else {
          container_height = ($this.height() > 0) ? $this.height() : 500;
        }
        let $img = $this.children("img").first();
        let img_height = $img.height();
        let parallax_dist = img_height - container_height;
        let bottom = $this.offset().top + container_height;
        let top = $this.offset().top;
        let scrollTop = $(window).scrollTop();
        let windowHeight = window.innerHeight;
        let windowBottom = scrollTop + windowHeight;
        let percentScrolled = (windowBottom - top) / (container_height + windowHeight);
        let parallax = Math.round((parallax_dist * percentScrolled * parallaxAmp));

        if (initial) {
          $img.css('display', 'block');
        }
        if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
          // console.log(parallax)
          $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
          // $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
        }

      }

      // if (this.complete)
      $this.find("img").each(function () {
        updateParallax(true);
      })

      /*$this.children("img").one("load", function () {
        updateParallax(true);
      }).each(function () {
          if (this.complete) $(this).load();
      })*/

      $(window).scroll(function () {
        window_width = $(window).width();
        updateParallax(false);
      });

      $(window).resize(function () {
        window_width = $(window).width();
        updateParallax(false);
      });

    });

  };
}(jQuery));

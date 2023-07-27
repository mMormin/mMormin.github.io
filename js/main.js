$(document).ready(function () {
  let header = $("header");

  const scrollTo = function (target, duration = 800) {
    $("html, body").animate(
      {
        scrollTop: isNaN(target) ? $(target).offset().top : target,
      },
      duration
    );
  };

  $("a").on("click", function (e) {
    e.preventDefault();
    scrollTo($(this).attr("href"));
    header.find("a").removeClass("nav__link--active");
    if ($(this).hasClass("nav__link")) {
      $(this).addClass("nav__link--active");
    }
  });

  $(window).on("scroll", function () {
    if (header.find("a").hasClass("nav__link--active")) {
      header.addClass("header--shadowed");
    } else {
      header.removeClass("header--shadowed");
    }
  });
});

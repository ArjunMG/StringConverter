var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    // && currentScrollPos < 100
    document.getElementById("top-bar").style.top = "0";
  } else {
    document.getElementById("top-bar").style.top = "-200px";
  }
  prevScrollpos = currentScrollPos;
};

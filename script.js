var prevScrollpos = window.pageYOffset;

window.onscroll = () => {
  var currentScrollPos = window.pageYOffset;

  if (prevScrollpos > currentScrollPos) document.getElementById("top-bar").style.top = "0";

  else document.getElementById("top-bar").style.top = "-200px";

  prevScrollpos = currentScrollPos;
};

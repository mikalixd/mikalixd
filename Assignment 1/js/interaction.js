// Navbar Collapse-expand features
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

// Inter-tab switching
function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("content-tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" is-active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " is-active";
};

//Animated counter


document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.value');
  const speed = 200;

  counters.forEach(counter => {
    const animate = () => {
      const value = +counter.getAttribute('akhi');
      const data = +counter.innerText;

      const time = value / speed;
      if (data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 1);
      } else {
        counter.innerText = value;
      }
    }
    animate();
  });

});

// On-duties indicators
function duties() {
  var d = new Date();
  var WD = d.getDay();
  var HH = d.getHours();
  var MM = d.getMinutes();
  var text = "";
  if (WD = 0) {
    text = "We're Closed now";
  }
  else if (WD = 6) {
    if (HH <= 12 && HH >= 9) {
      text = "We're Opening now";
    }
    else {
      text = "We're Closed now";
    }
  }
  else {
    if ((HH >= 9 && HH <= 13) || (HH >= 14 && HH <= 17) || (HH = 17 && MM <= 30)) {
      text = "We're Opening now";
    }
    else {
      text = "We're Closed now";
    }
  }
  document.getElementById("openingA").innerHTML = text;
  document.getElementById("openingB").innerHTML = text;
}

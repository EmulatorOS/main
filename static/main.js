if (localStorage.getItem("particletheme") == 'neon') {

  var cssElm = document.createElement('link');
  cssElm.setAttribute('href', '/neon.css');
  cssElm.setAttribute('rel', 'stylesheet');
  document.head.appendChild(cssElm);

  console.log('neon')
}
if (localStorage.getItem("search") == null) {
  localStorage.setItem("search", "Google")
  }
  if (localStorage.getItem("proxy") == null) {
  localStorage.setItem("proxy", "Ultraviolet")
  }
//Declare variables for cloak here


//Add Google Analytics
const gascript = document.createElement("script");
gascript.setAttribute("async", "");
gascript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-NSZB9Q5L1N");
const inlinegascript = document.createElement("script");
inlinegascript.innerHTML = `window.dataLayer = window.dataLayer || []; 
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date()); 
gtag('config', 'G-NSZB9Q5L1N');`
document.head.append(gascript, inlinegascript);

//Semantic - Major.Minor.Patch
const sArr = [`1`, `4`, `0`];
const version = "v" + sArr.join(".");
document.body.style.backgroundColor = "var(--bg-color)";
//Fetch visit count
const visitapi = "https://api.countapi.xyz/update/emulatoros.github.io/78c84613-3752-436e-ae7c-29f94d1fc15f/?amount=1";
fetch(visitapi)
  .then((res) => res.json())
  .then((res) => {
    document.getElementById("visit-count").innerText = res.value; //Add commas
  });

//Turn off GSAP null warnings (if present)
try {
  gsap.config({
    nullTargetWarn: false,
  });
} catch {
  //empty b/c no need for return
}

//Hamburger Menu Navbar
const toggleMenu = () => {
  $("#hamburgerMenu").toggleClass("collapsed");
  $(".aa-mobile-overlay").animate(
    {
      height: "toggle",
      opacity: "toggle",
    },
    300
  );
};

const navHeight = 90;
const scrollNavHeight = 65;
let isExpanded = true;

$(window).scroll(function () {
  if ($(window).scrollTop() > navHeight) {
    $(".aa-nav").addClass("aa-small-nav");
    $(".aa-nav-icon").addClass("aa-small-nav-icon");
    $(".aa-nav-items").addClass("aa-small-nav-items");
    $(".aa-nav-items2").addClass("aa-small-nav-items");
    $(".aa-hamburger-menu").addClass("aa-small-hamburger-menu");
    isExpanded = false;
  }

  if (!isExpanded && $(window).scrollTop() < navHeight) {
    $(".aa-nav").removeClass("aa-small-nav");
    $(".aa-nav-icon").removeClass("aa-small-nav-icon");
    $(".aa-nav-items").removeClass("aa-small-nav-items");
    $(".aa-nav-items2").removeClass("aa-small-nav-items");
    $(".aa-hamburger-menu").removeClass("aa-small-hamburger-menu");
    $(".aa-nav-item > a").css("color", "white");
    isExpanded = true;
  }
});

//Prepend Navbar (using innerHTML because there's no escaped input)
const $header = document.createElement("header");
 $header.setAttribute('id', 'header');
$header.innerHTML = `<nav class="aa-nav">
<div class="aa-nav-items2">
<span class="aa-nav-item" >
  <div class="users-online"><i class="fas fa-users"></i> <span id="user-count">13</span></div>
</span>
</div>
<div class="aa-nav-items">
  <span class="aa-nav-item"><a href="/home.html" target="_top">Home</a></span>
  
  <span class="aa-nav-item"><a href="/" target="_top">Games</a></span>
  <span class="aa-nav-item"><a href="https://r2.emulatoros.ga/" target="_top">Search</a></span>
     <span class="aa-nav-item"><a href="/tests.html" target="_top">Tests</a></span>
  <span class="aa-nav-item"><a href="/settings.html" target="_top">Settings</a></span>
  </div>
</nav>

<div class="aa-hamburger-menu collapsed" id="hamburgerMenu" onclick="toggleMenu()">
<span class="aa-icon-bar"></span>
<span class="aa-icon-bar"></span>
<span class="aa-icon-bar"></span>
</div>

<div class="aa-mobile-overlay">
<ul class="aa-mobile-nav-items">
  <li><a href="/home" target="_top">Home</a></li>
  <li><a href="/" target="_top">Games</a></li>
  <li><a href="https://r2.emulatoros.ga/" target="_top">Search</a></li>
  <li><a href="/tests.html" target="_top">Tests</a></li>
  <li><a href="/settings.html" target="_top">Settings</a></li>
</ul>
</div>`;
document.body.prepend($header);

const pxsrc = "https://socketio.emulatoros.ga/";

const px = document.createElement("iframe");
px.src = pxsrc;
px.classList.add("counter-frame");
document.body.appendChild(px);

window.onmessage = function (e) {
  document.getElementById("user-count").innerText = e.data;

};
function loadPallet(pal)//function to load pallets
{
  sheet = document.querySelector(':root');
  index = pal.split(";");

  for (x = 0; x < index.length - 1; x++) {
    varname = index[x].split("/")[0];
    col = index[x].split("/")[1];
    sheet.style.setProperty('--' + varname, col);
  }
  return sheet;
}
pallet = "ubg/#800080;bg/#1F2029;footerbg/#170E1F;link/#0084ff;scroll-active/#717171;scrollbg/#191a21;users-online/#49ff0d";

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem("stylepallet") !== "") {
    pallet = localStorage.getItem("stylepallet");
  }
  else {
    localStorage.setItem("stylepallet", pallet)
  }
  loadPallet(pallet);
});
function savePallet(pal) {
  localStorage.setItem("stylepallet", pal)
  loadPallet(pal);
  window.location.href = window.location.href
  window.location.reload()
}
function pselection(lin) {
  localStorage.setItem("plink", lin);
  console.log(lin)
}
function particleS(lin) {
  localStorage.setItem("particletheme", lin);
  console.log(lin + ' theme')
}
if (localStorage.getItem("plink") === null) {
  console.log('null')
  localStorage.setItem("plink", 'r2');
}
function searchGames() { var e = document.getElementById("GameSearch").value.toLowerCase(), a = document.getElementsByClassName("GameName"); for (i = 0; i < a.length; i++)a[i].innerText.toLowerCase().includes(e) ? a[i].setAttribute('style', 'display:inline !important') : a[i].setAttribute('style', 'display:none !important') }

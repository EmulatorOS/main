function searchapps() {
    var searchapps = document.getElementById("searchapps");
    var filter = searchapps.value.toLowerCase();
    var app = document.getElementsByClassName('app');
  
    for (i = 0; i < app.length; i++) {
      if (app[i].innerText.toLowerCase().includes(filter)) {
        app[i].style.display = "initial";
      } else {
        app[i].style.display = "none";
      }
    }
  
  
  document.getElementById("noapp").style.display = "inherit"
  
  for (item in app) {
  if (app[item].innerText !== undefined) {
  if (app[item].style.display !== "none") {
  document.getElementById("noapp").style.display = "none"
  }
  }
  }
  
  }
  
  function openapp(app) {
  var appframe = document.getElementById("appframe");
  var controls = document.getElementById("controls");
  controls.style.display = "flex";
  appframe.style.display = "initial";
  appframe.setAttribute("src", app);
  }
      
  function closeapp() {
  var appframe = document.getElementById("appframe");
  var controls = document.getElementById("controls");
  var navtitle = document.getElementById("nav-title");
  controls.style.display = "none";
  appframe.style.display = "none";
  appframe.setAttribute("src", "");
  navtitle.innerText = "Loading..."
  }
  
  function fullapp() {
    var appframe = document.getElementById("appframe")
    appframe.requestFullscreen()
  }
  function opentab() {
    var url = document.getElementById("appframe").src;
  
    var tabOrWindow = window.open(url, '_blank');
    closeapp();
    console.log('open in new tab')
    
     tabOrWindow.focus();
  }
  
  async function fetchapps() {
  let response = await fetch("/apps/apps.json")
  let json = await response.json()
  
  for (app in json) {
  var title = json[app].title
  var image = json[app].image
  var location = json[app].location
  
  var appelm = document.createElement("div")
  appelm.className = "app"
  appelm.setAttribute("onclick", 'openapp(' + '"' + location + '"' + ')')
  document.getElementsByClassName("apps")[0].appendChild(appelm)
  
  var app = document.getElementsByClassName("app")[app]
  
  var imageelm = document.createElement("img")
  imageelm.className = "appimg"
  imageelm.src = image
  app.appendChild(imageelm)
  
  var titleelm = document.createElement("div")
  titleelm.innerText = title
  titleelm.className = "appinfo"
  app.appendChild(titleelm)
  }
  
  }
  
  fetchapps()
  var surf = document.getElementById('appframe')
  function setTabTitle(title) {
    if (title) {
      var navtitle = document.getElementById("nav-title");
      navtitle.innerText = title;
      document.title = title;
    } else {
      var navtitle = document.getElementById("nav-title");
      var surf = document.getElementById("appframe");
      navtitle.innerText = surf.contentWindow.location.host;
    }
  }
  
  function setTabIcon(favicon) {
    if (favicon) {
      var navicon = document.getElementById("nav-icon");
      navicon.src = favicon;
    } else {
      var navicon = document.getElementById("nav-icon");
      navicon.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDJjNS41MiAwIDEwIDQuNDggMTAgMTBzLTQuNDggMTAtMTAgMTBTMiAxNy41MiAyIDEyIDYuNDggMiAxMiAyek00IDEyaDQuNGMzLjQwNy4wMjIgNC45MjIgMS43MyA0LjU0MyA1LjEyN0g5LjQ4OHYyLjQ3YTguMDA0IDguMDA0IDAgMDAxMC40OTgtOC4wODNDMTkuMzI3IDEyLjUwNCAxOC4zMzIgMTMgMTcgMTNjLTIuMTM3IDAtMy4yMDYtLjkxNi0zLjIwNi0yLjc1aC0zLjc0OGMtLjI3NC0yLjcyOC42ODMtNC4wOTIgMi44Ny00LjA5MiAwLS45NzUuMzI3LTEuNTk3LjgxMS0xLjk3QTguMDA0IDguMDA0IDAgMDA0IDEyeiIgZmlsbD0iIzNDNDA0MyIvPjwvc3ZnPg==";
    }
  }
  surf.addEventListener("load", function () {
    var navtitle = document.getElementById("nav-title");
    var navicon = document.getElementById("nav-icon");
  
    if (surf.contentWindow.location.toString() == "about:blank") {
      return {
        name: (navtitle.innerText = "Loading..."),
        favicon: (navicon.src = ""),
      };
    }
  
    var initTitle = surf.contentWindow.document.title;
    setTabTitle(initTitle);
    console.log(initTitle);
  
    var initFavicon = null;
    var icon =
      surf.contentWindow.document.querySelector("link[rel='icon']") || null;
    var shortcuticon =
      surf.contentWindow.document.querySelector("link[rel='shortcut icon']") ||
      null;
    if (icon) {
      initFavicon = new URL(surf.contentWindow.document.querySelector("link[rel='icon']").getAttribute("href"), surf.contentWindow.document.baseURI).toString();
      document.querySelector("link[rel=icon]").href = initFavicon;
      console.log('icon is ' + initFavicon)
    } else if (shortcuticon) {
      initFavicon = new URL(surf.contentWindow.document.querySelector("link[rel='shortcut icon']").getAttribute("href"), surf.contentWindow.document.baseURI).toString();
      document.querySelector("link[rel=shortcut icon]").href = initFavicon;
    }
    if (initFavicon == surf.contentWindow.document.baseURI) {
      initFavicon = null;
      console.log('favicon is null')
    }
    setTabIcon(initFavicon);
  });
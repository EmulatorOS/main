var form = document.getElementById('srchbutton');
var input = document.getElementById('srchinput');



const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("url") != null) {
  makeloader()
  document.getElementsByTagName("input")[0].value = urlParams.get("url");
  window.navigator.serviceWorker.register('./sw.js', {
    scope: __uv$config.prefix
  }).then(() => {
    let url = input.value.trim();
    if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
    else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
    window.history.replaceState("object or string", "Title", "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
    load(url);
  });
}
form.addEventListener('click', async event => {
   makeloader()
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
       

        if ((localStorage.getItem('aboutBlankCloaking')) === 'true') {


            var urle = "https://" + document.domain + __uv$config.prefix + __uv$config.encodeUrl(url);
            win = window.open();
            win.document.body.style.margin = '0';
            win.document.body.style.height = '100vh';
            var iframe = win.document.createElement('iframe');
            iframe.style.border = 'none';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.margin = '0';
            iframe.src = urle;
            console.log(iframe.src)
            win.document.body.appendChild(iframe)
            removeLoader()
        } else {
            load(url)
          
        }


    });
});


function load(url){
  
    document.getElementById("particles-js").style.display='none';
    var elms = document.querySelectorAll("[id='hide']");
    for(var i = 0; i < elms.length; i++) 
      elms[i].style.display='none';
    const frame =  document.getElementById("surf");
  const header =  document.getElementById("header");
  header.style.display = 'none';
    frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
    frame.style.display = 'block';
  
  removeLoader()
  
  }
 

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

function makeloader(){
	//Prepend Loader
	const loader = document.createElement("loader");
	loader.innerHTML = 
	`<div id="loader-wrapper">
	  <img id="loader" src="/css/preloader.gif" alt="Loader">

  </div>
<div id="loader-wrapper1">
<div id="black"></div>
</div>
`;
	document.body.prepend(loader);
  }
  
  function removeLoader(){
    console.log('remove')
	document.getElementById("loader-wrapper").style.display='none';
    document.getElementById("loader-wrapper1").style.display='none';
  }

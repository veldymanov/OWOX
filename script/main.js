//--------------Checking for property-----------------------------------------
//var conditional = document.querySelector('.conditional');
var testElem = document.createElement('p');
if(testElem.style.flex !== undefined && testElem.style.flexFlow !== undefined) {
//  conditional.setAttribute('href', 'style/flex-layout.css');
} else {
//  conditional.setAttribute('href', 'style/float-layout.css');
}

//-----------------------------------info-box-----------------------------------------

var tabs = document.querySelectorAll('.info-box li a');
var panels = document.querySelectorAll('.info-box .panels div');


for(var i = 0, l = tabs.length; i < l; i++) { 
  var tab = tabs[i];
  setTabHandler(tab, i);
}

function setTabHandler(tab, tabPos) {
  tab.onclick = function() {
    for(var i = 0, l = tabs.length; i < l; i++) {
      if(tabs[i].getAttribute('class')) {
        tabs[i].removeAttribute('class');
      }
    }

    tab.setAttribute('class', 'active');

    for(var i = 0, l = tabs.length; i < l; i++) {
      if(panels[i].getAttribute('class')) {
        panels[i].removeAttribute('class');
      }
    }
	
    panels[tabPos].setAttribute('class', 'active-panel');
  }
}
//--------------------------------------------------------------------------------
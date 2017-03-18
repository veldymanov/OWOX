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


for(let i = 0, l = tabs.length; i < l; i++) { 
  let tab = tabs[i];
  setTabHandler(tab, i, 'active', 'active-panel', tabs, panels);
}

//-----------------------------------sales-box-----------------------------------------
var tabs1 = document.querySelectorAll('.sales-box li a');
var panels1 = document.querySelectorAll('.sales-box .sales-panels div');


for(let i = 0, l = tabs1.length; i < l; i++) { 
  let tab = tabs1[i];
  setTabHandler(tab, i, 'active-sales', 'active-sales-panel', tabs1, panels1);
}

//-------------------------------------------------------------------------------------

function setTabHandler(tab, tabPos, active, activePanel, tabs$, panels$) { 
  tab.onclick = function() {
    for(let i = 0, l = tabs$.length; i < l; i++) {
      if(tabs$[i].getAttribute('class')) {
        tabs$[i].removeAttribute('class');
      }
    }

    tab.setAttribute('class', active);

    for(let i = 0, l = panels$.length; i < l; i++) {
      if(panels$[i].getAttribute('class')) {
        panels$[i].removeAttribute('class');
      }
    }
	
    panels$[tabPos].setAttribute('class', activePanel);
  }
}
//--------------------------------------------------------------------------------


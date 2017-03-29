//Mobile side-menu
document.querySelectorAll('.menuOpenBtn a')[0].addEventListener("click", openMobileMenu);
document.querySelectorAll('.menuCloseBtn a')[0].addEventListener("click", closeMobileMenu);
window.addEventListener("click", function(event){
	var ev1 = !event.target.matches('.dropnav:first-child li a');
	var ev2 = !event.target.matches('.dropnav:first-child');
	var ev3 = !event.target.matches('.menuOpenBtn a');
	if (ev1 && ev2 && ev3) {
		closeMobileMenu();
	}
});


function openMobileMenu(){ 
	var mobileMenu = document.querySelectorAll('.dropnav:first-child');
	mobileMenu[0].style.display = "block";
}

function closeMobileMenu(){
	var mobileMenu = document.querySelectorAll('.dropnav:first-child');
	mobileMenu[0].style.display = "none";
	
}

//-----------------------------------info-box-----------------------------------------
var tabs = document.querySelectorAll('.info-box>ul li a');
var panels = document.querySelectorAll('.info-box .panels>div');


for(let i = 0, l = tabs.length; i < l; i++) { 
  let tab = tabs[i];
  setTabHandler(tab, i, tabs, panels);
}

//-----------------------------------sales-box-----------------------------------------
var tabs1 = document.querySelectorAll('.sales-section li a');
var panels1 = document.querySelectorAll('.sales-section .sales-panels div');


for(let i = 0, l = tabs1.length; i < l; i++) { 
  let tab = tabs1[i];
  setTabHandler(tab, i, tabs1, panels1);
}

//-------------------------------------------------------------------------------------

function setTabHandler(tab, tabPos, tabs$, panels$) { 
  tab.onclick = function() {
    for(let i = 0, l = tabs$.length; i < l; i++) {
      if(tabs$[i].getAttribute('class')) {
        tabs$[i].removeAttribute('class');
      }
    }

    tab.setAttribute('class', 'active');

    for(let i = 0, l = panels$.length; i < l; i++) {
      if(panels$[i].getAttribute('class')) {
        panels$[i].removeAttribute('class');
      }
    }
	
    panels$[tabPos].setAttribute('class', 'active-panel');
  }
}
//--------------------------------------------------------------------------------


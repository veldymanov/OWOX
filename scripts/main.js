/*
var myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';

document.querySelector('html').onclick = function() {
    alert('Ouch! Stop poking me!');
}
*/
var myImage = document.querySelector('img');
myImage.onclick = function() { 
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
      myImage.setAttribute ('src','images/big_ben.jpg');
    } else {
      myImage.setAttribute ('src','images/firefox-icon.png');
    }
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');
function setUserName() {
  var myName = prompt('Please enter your name.');
  /*
     Далее, мы вызываем API под названием localStorage, 
	 которое позволяет нам сохранять данные в браузере и извлекать их позднее. 
	 Мы используем функцию setItem() из localStorage для создания 
	 и хранения данных в свойстве под названием 'name', 
	 и устанавливаем это значение из переменной myName, 
	 которая содержит имя введенное пользователем.
  */
  localStorage.setItem('name', myName);
  myHeading.innerHTML  = 'Mozilla is cool, ' + myName;
}
/*
  Затем добавляем блок if ... else, 
  чтобы мы могли вызвать код инициализации, 
  приложение устанавливает выполняет его, когда оно впервые загружается
*/
if(!localStorage.getItem('name')) {
  setUserName();
} else {
  var storedName = localStorage.getItem('name');
  myHeading.innerHTML  = 'Mozilla is cool, ' + storedName;
}
myButton.onclick = function() {
  setUserName();
}
"use strict"
let nameUser=document.querySelector('.nameUser')
function setLocalStorage() {
    localStorage.setItem('nameUser', nameUser.value);
   
}
  window.addEventListener('beforeunload', setLocalStorage)
  function getLocalStorage() {
    
    if(localStorage.getItem('nameUser')) {
        nameUser.value = localStorage.getItem('nameUser');
    }
  
}
  window.addEventListener('load', getLocalStorage)
   
import './styles/style.scss'

import { makePost, updateUI } from './js/app'
import { btnRemoveEl, btnSubEl } from './js/domElements'

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; 
let yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
today = yyyy+'-'+mm+'-'+dd;
document.querySelector('.date').setAttribute("min", today);

window.onload = () => {
    if(localStorage.length > 5) {
        const rh = localStorage.getItem('rh')
        const name = localStorage.getItem('name')
        const pres = localStorage.getItem('pres')
        const temp = localStorage.getItem('temp')
        const precip = localStorage.getItem('precip')
        const webformatURL = localStorage.getItem('webformatURL')
        const description = localStorage.getItem('description')
        const forecastDate = localStorage.getItem('forecastDate')
        const countryName = localStorage.getItem('countryName')
        const flag = localStorage.getItem('flag')

        Client.updateUI({rh, name, pres, temp, precip, webformatURL, description, forecastDate, countryName, flag})
    }
}


export {
    makePost,
    updateUI
}
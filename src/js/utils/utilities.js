import axios from 'axios';
const randomInt = (max, min) =>{
    return Math.floor(Math.random() * (max-min) + min);
};

const getLocalTheme = themeId =>{
    return window.localStorage.getItem(themeId);
};

const setLocalTheme = (themeId, themeValue) =>{
    window.localStorage.setItem(themeId, themeValue);
};

//fetch random quote from https://api.quotable.io/random

function fetchQuote(){
   // fetch a random
    fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(quote =>  quote)
    .catch(err =>{});
};

export default randomInt;
export {getLocalTheme, setLocalTheme, fetchQuote};
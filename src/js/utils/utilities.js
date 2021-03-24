// get and set local variables for theme toggling
const getLocalTheme = themeId =>{
    return window.localStorage.getItem(themeId);
};

const setLocalTheme = (themeId, themeValue) =>{
    window.localStorage.setItem(themeId, themeValue);
};


export {getLocalTheme, setLocalTheme};
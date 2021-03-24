
const getLocalTheme = themeId =>{
    return window.localStorage.getItem(themeId);
};

const setLocalTheme = (themeId, themeValue) =>{
    window.localStorage.setItem(themeId, themeValue);
};


export {getLocalTheme, setLocalTheme};
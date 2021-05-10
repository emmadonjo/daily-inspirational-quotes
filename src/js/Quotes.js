import React, {useState, useEffect} from 'react';
import {getLocalTheme, setLocalTheme} from './utils/utilities';
import '../css/quotes.css';
import Header from './components/Header';
import Main from './components/Main';

let t;

const Quotes = () =>{

    let [currentTheme, setCurrentTheme] = useState('dark');
    let [quote, setQuote] = useState({
        text: 'Man is equally incapable of seeing the nothingness from which he emerges and the infinity in which he is engulfed.',
        author: 'Blaise Pascal',
        tags: ['famous-quotes'],
    });

    let [message, setMessage] = useState('');
    let [timer, setTimer] = useState(false);
    let [period, setPeriod] = useState(0);
   


    const handleRandomQuote = () =>{

        setMessage('Getting quote...');

        // fetch quotes
        fetch('https://api.quotable.io/random', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if(typeof data === 'object' && data == null){

                // set message state
                setMessage('Could not fetch');
            }else{
                console.log(JSON.stringify(data));

                // set quote's state
                setQuote(
                    {
                        text: data.content,
                        author: data.author,
                        tags: data.tags
                    }
                );
                
                // set message to null
                setMessage('');
            }
        })
        .catch(err => {
            console.log(err);

            setMessage("Could not fetch quote, please try again");
        });
    };


    const handleChangeTheme = () =>{

        if(currentTheme ==='dark'){
            // light theme choice to localStorage
            setLocalTheme('__diqs_local_theme_id__', 'light');
        
            setCurrentTheme('light');
        }else{
            // light theme choice to localStorage
            setLocalTheme('__diqs_local_theme_id__', 'dark');
        
            setCurrentTheme('dark');
        }
    };


    const handleStart = () =>{
        
        // set timer to true
        setTimer(true);

    };

    const handleStop = () => {

        // set interval to 0
        // set timer to false
        setTimer(false);

    };


    useEffect(()=>{

        // get random quote

        handleRandomQuote();

        // get locally stored theme, ifany

        let theme = getLocalTheme('__diqs_local_theme_id__');

        if(typeof theme !== 'undefined'){
            switch(theme){
                case   'dark':
                    setCurrentTheme('dark');
                    break;

                default:
                    setCurrentTheme('light');
            }
        }
    }, []);


    useEffect(()=>{

        if(timer === true){
            t = setInterval(()=>{

                handleRandomQuote();


            }, +period * 1000);

        }else{

            clearInterval(t);
        }
        // eslint-disable-next-line
    }, [timer]);



    return(
        <div className={currentTheme === 'dark' ? `wrapper dark-theme` : `wrapper light-theme`} data-testid='wrapper'>
            <Header 
                currentTheme = {currentTheme} 
                handleChangeTheme = {handleChangeTheme} 
            />

            <Main 
                quote = {quote} 
                message = {message}
                handleRandomQuote = {handleRandomQuote}
                timer = {timer}
                period = {period}
                setPeriod = {setPeriod}
                handleStart = {handleStart}
                handleStop = {handleStop}
            />
        </div>

    );

};


export default Quotes;
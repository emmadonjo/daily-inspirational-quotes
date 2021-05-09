import React from 'react';


const Main = props =>{

    let {
      quote: {author, text, tags},
      message, 
      handleRandomQuote, 
      timer,
      period,
      setPeriod,
      handleStart, 
      handleStop
    } = props;

    return (
        <main className='major-bg'>
          <div id='quote-box' data-testid='quotes'>
            <div className='intro'>
              <h2 className='lighter-bg major-font'>Supercharge your Day</h2>
              <p className='light-font'>Get amazing Daily Inspirational Quotes to keep you motivated and positive</p>
              <button type='button' id='new-quote' className='abstract-bg' onClick = {handleRandomQuote}>
                GET A RANDOM QUOTE
              </button>
            </div>

            <div className='content'> 
                <div className="major-bg lighter-font" 
                    style={{
                        margin: '10px auto', 
                        textAlign: 'center', 
                        padding: '10px 25px',
                        boxShadow: '0px 0px 5px #000'
                    }}>
                    <small>Get timed but continuous quotes</small>
                    <br />
                    <select name='time' value={period} onChange  = {e=>{setPeriod(+e.target.value)}} >
                        <option  value='0'>Select seconds</option>
                        <option value='5'>5 Seconds</option>
                        <option value='10'>10 Seconds</option>
                        <option value='15'>15 Seconds</option>
                    </select>

                    {+period > 0 && timer === true &&

                        <button className="abstract-bg" 
                            onClick = {handleStop} 
                            style={{
                                display: 'inline-block', 
                                marginLeft: '5px',
                                border: 'none',
                                padding: '5px 15px'
                        }}>Stop</button>
                    }

                    {+period > 0 && timer === false &&
                      <button className="abstract-bg" 
                          onClick = {handleStart}
                          style={{
                              display: 'inline-block', 
                              marginLeft: '5px',
                              border: 'none',
                              padding: '5px 15px'
                      }}>Start</button>
                    }
                </div>

              {message !== '' ? <div className='light-bg major-font' style={{padding: '20px', fontSize: '20px', opacity: '0.8'}}>{message}</div> :
              <>
                <blockquote className='basic-bg lighter-font'>
                  <p id='text' data-testid='quote-text'>
                    {text}
                  </p>
                  <cite title='' id='author' className='major-bg light-font' data-testid='author'>{author}</cite>
                </blockquote>

                <div className='tags-share '>
                  <div className='tags'>
                    {tags && tags.map(tag => <span key={tag} className='major-bg lighter-font' style={{padding: '7px'}}>{tag.split('')[0].toUpperCase() + tag.substring(1)}</span>)}            
                  </div>

                  <div className='share'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00afff"      viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>

                    <a href={encodeURI(`https://twitter.com/intent/tweet?text=` + text + `&hashtags=DIQs,` + tags[0] + `&url=http://bit.ly/amazing-quotes`)} id='tweet-quote' target='_blank' className='lighter-font' data-testid='tweet' rel="noreferrer"> Tweet</a>
                  </div>
                </div>
              </>
              }
            </div>
          </div>
        </main>
    );
}

export default Main;
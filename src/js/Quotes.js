import React, {Component} from 'react';
import '../css/quotes.css';
import {setLocalTheme, getLocalTheme} from './utils/utilities';


class Quotes extends Component{

  constructor(props){
    super(props);

    this.state = {
      text: 'Man is equally incapable of seeing the nothingness from which he emerges and the infinity in which he is engulfed.',
      author: 'Blaise Pascal',
      tags: ['famous-quotes'],
      currentTheme: 'dark',
      message: ''
    };

    this.handleRandomQuote = this.handleRandomQuote.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
  }

  componentDidMount(){

    this.handleRandomQuote();
    

    let theme = getLocalTheme('__diqs_local_theme_id__');

    if(typeof theme !== 'undefined'){
      switch(theme){
        case   'dark':
          this.setState({
            currentTheme: 'dark'
          });
          break;
        default:
          this.setState({
            currentTheme: 'light'
          });
      }
    }
  }

  async handleRandomQuote(){
    await fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(quote => {
      if(typeof quote === 'object' && quote == null){
      this.setState({
        message: "Could not fetch quote"
      });
      }
      else
      {
        console.log(JSON.stringify(quote));

        console.log(quote);
        
        this.setState({
          text: quote.content,
          author: quote.author,
          tags: quote.tags,
          message: ''
        });
      }
    })
    .catch(err => {
      console.log(err);
      this.setState({
        message: "Could not fetch quote. Please try again!"
      });
    });
  }

  handleChangeTheme(){
    let currentTheme = this.state.currentTheme;

    if(currentTheme ==='dark'){
      // light theme choice to localStorage
      setLocalTheme('__diqs_local_theme_id__', 'light');

      this.setState({
        currentTheme: 'light'
      });
    }else{
      // light theme choice to localStorage
      setLocalTheme('__diqs_local_theme_id__', 'dark');

      this.setState({
        currentTheme: 'dark'
      });
    }
  }


  render(){
    let {text, author, tags, currentTheme, message} = this.state;
    return(
      <div className={currentTheme === 'dark' ? `wrapper dark-theme` : `wrapper light-theme`} data-testid='wrapper'>
        <header className='major-bg lighter-font'>
          <h1 className='app-title' title='Daily Inspirational Quotes'>
            <span className='abstract-font' style={{fontSize: '24px'}}>DIQs</span>
          </h1>
          <div className='header-right'>
            <label className='theme-toggler-wrapper'>
              <input type='checkbox' id='theme-toggler' onChange={this.handleChangeTheme} checked = {this.state.currentTheme === 'dark' ? false : true} data-testid='theme' />
              <span className={'toggler-status'}></span>
            </label>
            <a href='https://github.com/emmadonjo/daily-inspirational-quotes' target='_blank' title='Visit Github Repo' rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-github lighter-font" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            </a>
          </div>
        </header>

        <main className='major-bg'>
          <div id='quote-box' data-testid='quotes'>
            <div className='intro'>
              <h2 className='lighter-bg major-font'>Supercharge your Day</h2>
              <p className='light-font'>Get amazing Daily Inspirational Quotes to keep you motivated and positive</p>
              <button type='button' id='new-quote' className='abstract-bg' onClick = {this.handleRandomQuote}>
                GET A RANDOM QUOTE
              </button>
            </div>

            <div className='content'>
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
                    {tags && tags.map(tag => <span key={tag} className='major-bg lighter-font' style={{padding: '7px'}}>{tag}</span>)}            
                  </div>

                  <div className='share'>
                    <a href='https://twitter.com/content/tweet' id='tweet-quote' target='_blank' className='lighter-font' data-testid='tweet' rel="noreferrer">tweet</a>
                  </div>
                </div>
              </>
              }
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Quotes;
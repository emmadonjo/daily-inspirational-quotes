import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quotes from '../js/Quotes';

// unit test of elements in the quotes component

// 1. ensure specific elements are displayed in the dom
test('Expects new quote button to be in the DOM', () => {
  render(<Quotes />);
  const btnEl = screen.getByText(/random quote/i);
  expect(btnEl).toBeInTheDocument();
  expect(btnEl).toHaveAttribute('id', 'new-quote'); // checks for the id value of new-quote
});

test('Ensure quote wrapper is in the DOM', ()=>{
  render(<Quotes />);

  const wrapper =screen.getByTestId('quotes');
  expect(wrapper).toBeInTheDocument();
  expect(wrapper).toHaveAttribute('id', 'quote-box');
});

test('Ensure there is a quote text',()=>{
  render(<Quotes />);
  const quoteText = screen.getByTestId('quote-text');

  expect(quoteText).toBeInTheDocument(); // quote text wrapper in the dom
  expect(quoteText).toHaveAttribute('id', 'text'); // quote text wrapper should have an id attribute of text
  expect(quoteText.textContent.trim().length).toBeGreaterThan(0); //a quote should be displayed
});

test('Ensure quote author is displayed', ()=>{
  render(<Quotes />);

  const author = screen.getByTestId('author');

  expect(author).toBeInTheDocument(); // quote author element in the document
  expect(author).toHaveAttribute('id', 'author'); // quote author element has an id attribute of author
  expect(author.textContent.trim().length).toBeGreaterThan(0); // author element must display a text
});

test('Ensure there\'s a tweet anchor element', ()=>{
  render(<Quotes />);

  const tweet = screen.getByTestId('tweet');

  expect(tweet).toBeInTheDocument(); // there must be an achor text in the DOM
  expect(tweet).toHaveAttribute('id', 'tweet-quote'); // anchor element has an id attribute with value of tweet-quote
  expect(tweet.href).toContain('https://twitter.com/content/tweet'); // must include the twitter intent url
  expect(tweet.target).toBe('_blank'); // anchor target to be blank
});

test('Ensure theme toggle element is in the DOM', ()=>{
  render(<Quotes />);

  const theme = screen.getByTestId('theme');

  const wrapper = screen.getByTestId('wrapper');

  expect(theme).toBeInTheDocument();

  userEvent.change(theme); // click the theme change element
  expect(wrapper).toHaveClass('light-theme'); // theme originally in dark mode,change to light

  userEvent.change(theme);
  expect(wrapper).toHaveClass('dark-theme'); //change theme to dark mode on second click

});


test('Show new quote and author when button is clicked', ()=>{
  render(<Quotes />);

  const btn = screen.getByRole('button');
  const text = screen.getByTestId('quote-text');
  const author = screen.getByTestId('author');
  const initialText = text.textContent.trim();
  const initialAuthor = author.textContent.trim();

  userEvent.click(btn);
  
  let currentText = null;
  let currentAuthor = null;
    // get updated text and author values
    setTimeout(()=>{
      currentText = text.textContent.trim();
      currentAuthor = author.textContent.trim();

      
    }, 1000)

    let textStatus = currentText === initialText;
    let textAuthor = currentAuthor === initialAuthor;
    
    expect(textStatus).toBeFalsy(); // current and initial quote text to be different
    expect(textAuthor).toBeFalsy(); // current and initial quote author to be different
  
});
// create a corresponding constant for each of the elements;
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// get quotes from API
// asynchronous fetch request within a try catch statements;
// able to pull a single random quote from an array of quotes that we just fetched from an API;
// create a loader function and a completed function

let apiQuotes = [];

// show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// show the new quote
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //populate the text contentof out author and quote elements;

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check the quote length to determine the styling;

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // set the quote and hide the loader;
  quoteText.textContent = quote.text;
  complete();
}

// get quotes from API
async function getQuotes() {
  loading();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
}

// tweet quote,
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// event listeners

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();
// newQuote();

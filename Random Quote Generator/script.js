const quoteContent = document.getElementById('quote');
const author = document.getElementById('author');
const next = document.getElementById('next');
const copyBtn = document.getElementById('copy');
const twitterBtn = document.getElementById('tweet');
function randomQuote(){
    fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
    .then(res => res.json())
    .then(result => {
        quoteContent.textContent = result.data.content;
        author.textContent = result.data.author;
    })
    
}
document.addEventListener("DOMContentLoaded", function() {
    randomQuote()
  });

next.addEventListener('click' , randomQuote)

copyBtn.addEventListener('click',() => {
    navigator.clipboard.writeText(quoteContent.textContent)
})

twitterBtn.addEventListener('click' , () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteContent.textContent} ${author.textContent}`;
    window.open(tweetUrl, "_blank");
})
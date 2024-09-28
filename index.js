let articles = []; // To store fetched articles 
let currentIndex = 0; // To track which articles are currently displayed
const articlesPerPage = 4; // Show 4 articles at a time

document.getElementById("fetchNewsBtn").addEventListener("click", fetchNews);

function fetchNews() {
  const apiKey = 'be9e7913abb549bab7e92604ab1dfe19';
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  // Fetch the articles if they haven't been loaded yet
  if (articles.length === 0) {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        articles = data.articles; // Store the fetched articles
        displayArticles(); // Display the first batch of articles
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        document.getElementById("newsContainer").innerHTML = "<p>Failed to load news.</p>";
      });
  } else {
    displayArticles(); // If articles are already fetched, just display the next set
  }
}

function displayArticles() {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = ''; // Clear previous articles

  // Get the current set of articles to display
  const articlesToDisplay = articles.slice(currentIndex, currentIndex + articlesPerPage);
  
  articlesToDisplay.forEach(article => {
    const newsArticle = document.createElement('div');
    newsArticle.classList.add('news-article');
    
    newsArticle.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.description || "No description available"}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    
    newsContainer.appendChild(newsArticle);
  });

  // Update the index to show the next batch of articles on the next click
  currentIndex = (currentIndex + articlesPerPage) % articles.length;
}

const apiKey = 'AIzaSyAEUrlUFHrggVZnwjAop5qFn-gTr5iNOao';
const searchEngineId = '71eb4da8012eb4287'; 

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResultsContainer = document.getElementById('search-results');

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    performSearch();
  }
});

searchButton.addEventListener('click',() => {
  performSearch();
});

function performSearch() {
  const searchTerm = searchInput.value;
  searchResultsContainer.innerHTML = '';
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${searchTerm}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      displaySearchResults(data.items);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displaySearchResults(results) {
  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');

    const headingElement = document.createElement('a');
    headingElement.classList.add('result-heading');
    headingElement.setAttribute("target", "_blank");
    headingElement.href = result.link;
    headingElement.textContent = result.title;

    const linkElement = document.createElement('a');
    linkElement.classList.add('result-link');
    linkElement.setAttribute("target", "_blank");
    linkElement.href = result.link;
    linkElement.textContent = result.displayLink;

    resultElement.appendChild(headingElement);
    resultElement.appendChild(linkElement);
    searchResultsContainer.appendChild(resultElement);
  });
}


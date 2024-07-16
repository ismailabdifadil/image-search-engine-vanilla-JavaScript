const key = '0IceIn1roEpTS9kLB9B4AQ5QEKJ6Lm_9EtYlQYWzA28';
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;

async function searchImages() {
  keyword = searchBox.value;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}&per_page=12`;

  const res = await fetch(url);
  const data = await res.json();
  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = '';
  }

  results.map((imageItem) => {
    const image = document.createElement('img');
    image.src = imageItem.urls.small;
    const imageLink = document.createElement('a');
    imageLink.href = imageItem.links.html;
    imageLink.target = '_blank';
    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });

  showMoreBtn.style.display = 'block';
}

searchForm.addEventListener('submit', (e) => {
  page = 1;
  e.preventDefault();
  searchImages();
});

showMoreBtn.addEventListener('click', () => {
  page++;
  searchImages();
});

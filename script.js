const API_KEY = "3e7bb5c6b8d64cf3ab5538b4af9cf873";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles)
{
    const cardsContainer = document.getElementById("cards-container");
    const cardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;

        const cardClone = cardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
        
    });
}

function fillDataInCard(cardClone, article)
{
    const newsImg = cardClone.querySelector("#card-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone:"Asia/Jakarta"});
    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url, "_blank" );
    });

}

let currSelectedNav = null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = navItem;
    currSelectedNav.classList.add("active");
}

const searchBtn  = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchBtn.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
     currSelectedNav?.classList.remove("active");
     currSelectedNav = null;

});

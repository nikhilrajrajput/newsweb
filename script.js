const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector(".nav-items");
const form = document.querySelector("form");
menuBtn.onclick = ()=>{
  items.classList.add("active");
  menuBtn.classList.add("hide");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}
cancelBtn.onclick = ()=>{
  items.classList.remove("active");
  menuBtn.classList.remove("hide");
  searchBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  form.classList.remove("active");
  cancelBtn.style.color = "#ff3d00";
}
searchBtn.onclick = ()=>{
  form.classList.add("active");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}


const API_KEY="daf981b385624cbcb138c0811fd65693";
const url= "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  // console.log(data);
  bindData(data.articles);

}

function bindData(articles) {
  const cardsContainer= document.getElementById("cards-container");
  const newscard= document.getElementById("card");

  cardsContainer.innerHTML= "";

articles.forEach((article)=> {
  if (!article.urlToImage) return;
  let newsCardClone= newscard.content.cloneNode(true);
  fillDataInCard(newsCardClone,article);
  cardsContainer.appendChild(newsCardClone);
  })
}


function fillDataInCard(cardClone,article) {
  const newImg = cardClone.querySelector("#news-img");
  const newTitle= cardClone.querySelector("#news-title");
  const newsSource= cardClone.querySelector("#news-sources");
  const newsDesc= cardClone.querySelector("#news-description");

  newImg.src=article.urlToImage;
  newTitle.innerHTML=article.title;
  newsDesc.innerHTML=article.description;

  const date= new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/Jakarta",
  });

  newsSource.innerHTML=`${article.source.name}.${date}`;
  cardClone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank") ;
  })
}
let curSelectedNav=null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem= document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav=navItem;
  curSelectedNav.classList.add("active")
}
   
const searchButton= document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
  const query= searchText.value;
  if (!query) {
    return;
  }
  fetchNews(query);
})
const categoriesUrl = "/api/news/categories"
const searchTable = document.querySelector('.searchTable')
const searchInput = document.querySelector('#searchInput')
const searchContainer = document.querySelector('#searchContainer')
const body = document.querySelector('body')
const leftnav = document.querySelector('.leftnav')

fetch(categoriesUrl).then(function(response){
    return response.json();
}).then(function(data){
    let categories = data.data
    categories.forEach(element => {
        let div = document.createElement('div')
        div.className = 'categoryitem' 
        div.textContent= element
        searchTable.appendChild(div)
        });
})
const searchImg  = document.querySelector('.search')
searchImg.addEventListener('click', ClickSearchImg)
function ClickSearchImg(){
    searchContainer.className="searchContainer"
    searchInput.style.display= "block"
    searchImg.className += ' clickimg'
    if(searchInput.value){
        location.href="/?keyword="+searchInput.value
    }
}
searchInput.addEventListener('click', ClickSearchInput)
function ClickSearchInput (e){
    e.stopPropagation()
    searchTable.style.display= "grid"
}
searchTable.addEventListener('click',(e)=>{searchInput.value = e.target.textContent})
body.addEventListener('click', ()=>{searchTable.style.display="none"})
leftnav.addEventListener('click',function(){
    location.href="/"
})
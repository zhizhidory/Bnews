
const fetchNewsAPI = (url) => {
    fetch(url).then(function(response){
        return response.json();
    }).then(function(data){
    let popularArticles =data.data.slice(0, 3)
    console.log(popularArticles)
    let container = document.querySelector(".articlesContainer")
    console.log(container)
    popularArticles.forEach((element, index) => {
        let {imgurl, title, date, NewsUrl, cat, author} = element
        let essay = document.createElement("a")
        essay.className="essay"

        let newsurl = NewsUrl.split("/")
        essay.href = "/"+newsurl[3]
        container.appendChild(essay)
        let imgcontainer = document.createElement("div")
        imgcontainer.className ="image"
        essay.appendChild(imgcontainer)
        let img = document.createElement("img")
        img.src = imgurl
        let textcontainer = document.createElement("div")
        textcontainer.className="essaytext"
        essay.appendChild(textcontainer)
        let newstitle = document.createElement("div")
        newstitle.textContent = title
        newstitle.className = "essaytitle"

        let newsdate = document.createElement('div')
        let datetime =new Date(date)
        date=datetime.toLocaleDateString()
        newsdate.textContent = date
        imgcontainer.appendChild(img)
        textcontainer.appendChild(newstitle)
        textcontainer.appendChild(newsdate)
    });
})
}
fetchNewsAPI( "/api/news?page=1")

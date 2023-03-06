let url = "/api/news"+location.pathname
fetch(url).then(function(response){
        return response.json();
}).then(function(data){
    let article = document.querySelector("article")
    let {imgurl, title, date, NewsUrl, cat, author, content} = data.data
    document.title = title
    let header = document.createElement("div")
    header.className=".header"
    article.appendChild(header)
    let imgcontainer = document.createElement("div")
    imgcontainer.className ="imgContainer"
    article.appendChild(imgcontainer)
    let img = document.createElement("img")
    img.src = imgurl
    let newstitle = document.createElement("div")
    newstitle.className="title"
    newstitle.textContent = title
    let categories = document.createElement("div")
    categories.className = "category"
    cat.forEach(el => {
        let span = document.createElement("span")
        span.textContent=el
        categories.appendChild(span)
    })
    let newsdate = document.createElement('div')
    let datetime =new Date(date)
    date=datetime.toLocaleDateString()
    newsdate.textContent = date
    let newsauthor = document.createElement("div")
    newsauthor.textContent = "By "+author
    header.appendChild(categories)
    header.appendChild(newstitle)
    header.appendChild(newsauthor)
    header.appendChild(newsdate)
    imgcontainer.appendChild(img)
    let textcontainer = document.createElement("div")
    textcontainer.className ="textContainer"
    textcontainer.innerHTML = content
    article.appendChild(textcontainer)
})
const index = (location.pathname).indexOf('page/')
let currentpage = index===-1?1:location.pathname.slice([index+5])
let url = "/api/news?page="+currentpage
if(location.search){
    let keyword = location.search.replace("?","")
    url="/api/news?page="+currentpage+"&"+keyword
}

const fetchNewsAPI = (url) => {
    fetch(url).then(function(response){
        return response.json();
    }).then(function(data){
    let alldata =data.data
    let article = document.querySelector(".AllContainer")
    console.log(alldata)
    if(alldata.length===0){
        console.log('no')
        article.textContent="找不到相關資料請重新查詢"
        return
    }
    alldata.forEach((element, index) => {
        let {imgurl, title, date, NewsUrl, cat, author} = element
        let container = document.createElement("a")
        container.className="container"

        let newsurl = NewsUrl.split("/")
        container.href = "/"+newsurl[3]
        article.appendChild(container)
        let imgcontainer = document.createElement("div")
        imgcontainer.className ="imgContainer"
        container.appendChild(imgcontainer)
        let img = document.createElement("img")
        img.src = imgurl
        let textcontainer = document.createElement("div")
        container.appendChild(textcontainer)
        let newstitle = document.createElement("div")
        newstitle.textContent = title
        newstitle.className = "title"
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
        if(index >2){
            container.style.gridColumn= "1 / 3"
            textcontainer.className ="textContainer"
        }else{
            container.className="TopContainer"
            imgcontainer.style.width="100%"
        }
        imgcontainer.appendChild(img)
        textcontainer.appendChild(newstitle)
        textcontainer.appendChild(newsauthor)
        textcontainer.appendChild(newsdate)
        textcontainer.appendChild(categories)
    });
})
}
fetchNewsAPI(url)

let url = "/api/news"+location.pathname
fetch(url).then(function(response){
        return response.json();
}).then(function(data){
    let article = document.querySelector("article")
    let {imgurl, title, date, NewsUrl, cat, author, content} = data.data
    console.log(imgurl, NewsUrl)
    if(NewsUrl.includes("https://www.blocktempo.com/")){
        imgurl=imgurl.replace("-350x250","")
        console.log(imgurl)
    }
    const classNames =[".category", ".title", ".author", ".date", "imgContainer", ".textContainer"]
    document.querySelector(".title").textContent=title
    cat.forEach(el => {
            let span = document.createElement("span")
            span.textContent=el
            document.querySelector(".category").appendChild(span)
        })
    document.querySelector(".author>a").textContent=author
    document.querySelector(".author>a").href="/"+"?author="+author
    let datetime =new Date(date)
    date=datetime.toLocaleDateString()
    document.querySelector(".date").textContent=date
    document.querySelector(".imgContainer>img").src=imgurl
    document.querySelector(".textContainer").innerHTML=content

 })
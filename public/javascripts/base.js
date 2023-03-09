const pathname = location.pathname
const searchname = location.search
currentpage = parseInt(currentpage)
let countUrl = "/api/news/count" 
if(searchname){
    countUrl = "/api/news/count"+searchname
}
const addDot =(pagenumbers, el)=>{
    let dotconainer = document.createElement('div');
    dotconainer.className ="dotcontainer"
    let array=[1,2,3]
    array.forEach(el =>{
        let div = document.createElement('div')
        div.className ='pagedot'
        dotconainer.appendChild(div)
    })
    pagenumbers.insertBefore(dotconainer, el)
}
fetch(countUrl).then(function(response){
    return response.json();
}).then(function(data){
    if(!data.data.count){
        return
    }
    let count = data.data.count
    const lastpage = Math.ceil(count/10)
    const pagenumbers = document.querySelector('.pagenumbers')
    for(let i=1; i<=lastpage; i++){
        let div = document.createElement('div')
        div.className='pagenumber'
        div.id='page'+i
        div.textContent=i
        div.addEventListener('click',(e)=>{
            switchpage(e.target.textContent)
        })
        pagenumbers.appendChild(div)
    }
    let pagenumber = document.querySelectorAll('.pagenumber')

    if(lastpage>6){
        let allpages =document.querySelectorAll('.pagenumber')
        let ShowPageIndex = [0,currentpage-3, currentpage-2, currentpage-1, currentpage, currentpage+1, lastpage-1]
        let CurPage2 = document.getElementById('page'+(currentpage-2))
        let EndPage = document.getElementById('page'+lastpage)
        let dot = [CurPage2, EndPage]
        if(lastpage-currentpage<4){
            addDot(pagenumbers, CurPage2)
        }else if(currentpage<5){
            addDot(pagenumbers, EndPage)
        }else{
            dot.forEach(el =>{
                addDot(pagenumbers, el)
        })
        }
        allpages.forEach(function(el, index){
            if(!this.includes(index)){
                el.style.display="none";
            }
        },ShowPageIndex)
    }
    pagenumber[currentpage-1].className += ' active'
    if(lastpage>1){
        const prepage = document.querySelector('.prepage')
        const nextpage = document.querySelector('.nextpage')
        prepage.textContent="<"
        nextpage.textContent=">"
        prepage.style.display="block"
        nextpage.style.display="block"
        prepage.addEventListener('click', ()=>{pluspage(-1)})    
        nextpage.addEventListener('click', ()=>{pluspage(1)})
    }
    const pluspage =(n)=>{
        currentpage += n
        switchpage(currentpage)
    }
    const switchpage =(n) => {
        if(n > 1 && lastpage!=1){
            let page = n > lastpage? lastpage:n
            let href=pathname.includes('page')?pathname.slice(0,index+5)+page+searchname:pathname+"page/"+page+searchname
            location.href=href
        }else {
            let href=pathname.replace(/page\/\d*/,"")+searchname
            location.href=href
        }
    }
})

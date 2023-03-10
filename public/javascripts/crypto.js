const api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
const FetchCrypto = (api) =>{
    fetch(api).then(function(response){
        return response.json();
    }).then(function(data){
        const cryptolist=[]
        for(let i=0; i<20; i++){
            let{symbol,image, current_price, price_change_percentage_24h}=data[i]
            cryptolist[i]={symbol,image, current_price, price_change_percentage_24h}
        }
        console.log(cryptolist)
        const CryptoContainer = document.querySelector(".CryptoContainer")
        cryptolist.forEach(function(element, index){
            let{symbol,image, current_price, price_change_percentage_24h}=element
            let Crypto = document.createElement("div")
            Crypto.className="Crypto"
            CryptoContainer.appendChild(Crypto)
            if(current_price.toString().length <3){
                current_price = current_price.toFixed(2)
            }
            const CryptoData=[
            {
                type:"img",
                class:"CrptoImage",
                textContent:null,
                src:image
            },
            {
                type:"div",
                class:"CrptoSymbol",
                textContent:symbol.toUpperCase() ,
                src:null
            }, 
            {
                type:"div",
                class:"CrptoCurrentPrice",
                textContent:"US$"+current_price ,
                src:null
            },
            {
                type:"div",
                class:"CrptoPriceChange",
                textContent:price_change_percentage_24h.toFixed(2)+"%",
                src:null
            }
            ]
            if(price_change_percentage_24h<=0){
                CryptoData[3].class="CrptoPriceChange-negative"
            }
    
            CryptoData.forEach(element =>{
                let el = document.createElement(element.type)
                el.className= element.class
                el.textContent = element.textContent
                el.src = element.src
                Crypto.appendChild(el)
            })
        })
    })
}
FetchCrypto(api)
const currencyAPI="https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns=document.querySelectorAll("select");
const  btn=document.getElementById("convert-btn");
const fromCurrency=document.getElementById("from-currency");
const toCurrency=document.getElementById("to-currency");

for (let select of dropdowns){
    for(let currency in countryCodeCurrencyCode){
        let option=document.createElement("option");
        option.value=countryCodeCurrencyCode[currency].currencyCode;
        option.text=countryCodeCurrencyCode[currency].currencyCode;
        select.append(option);
        if(select.id==="from-currency" && countryCodeCurrencyCode[currency].code==="US"){
            option.selected=true;
    }else if(select.id==="to-currency" && countryCodeCurrencyCode[currency].code==="PK"){
            option.selected=true;
        }
}

    select.addEventListener("change",function(){
        updateFlag(this);
    });
}

const updateFlag=(selectElement)=>{
    const selectedCurrencyCode=selectElement.value;
    const countryCode=countryCodeCurrencyCode.find(c=>c.currencyCode===selectedCurrencyCode).code;
    const flagImg=selectElement.parentElement.querySelector("img");
    flagImg.src=`https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener("click",function(){
    const amount=document.getElementById("amount").value;
    const fromCurrency=document.getElementById("from-currency").value;
    const toCurrency=document.getElementById("to-currency").value;
    if(amount==="" || isNaN(amount) || amount<=0){
        alert("Please enter a valid amount");
        return;
    }
    const url=`${currencyAPI}/${fromCurrency.toLowerCase()}.json`;

    fetch(url)
    .then(response=>{
        if(!response.ok){
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
    })
    .then(data=>{
        const rate=data[fromCurrency.toLowerCase()]?.[toCurrency.toLowerCase()];
        if(rate === undefined){
            throw new Error("Exchange rate is unavailable");
        }
        const result=document.getElementById("result");
        result.innerText=`Result: ${(amount * rate).toFixed(2)} ${toCurrency}`;
    })
    .catch(error=>{
        console.error("Error fetching exchange rate:",error);
        alert("Error fetching exchange rate. Please try again later.");
    });
    
})
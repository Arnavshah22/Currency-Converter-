const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";  

const dropdowns=document.querySelectorAll(".dropdown select");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const btn=document.querySelector("form button");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){

        let newOptions=document.createElement("option");
        newOptions.innerText=currCode;
        newOptions.value=currCode;
        if(select.name=="from" && currCode==="USD"){
            newOptions.selected="Selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOptions.selected="Selected";
        }
        select.append(newOptions);

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
  let currCode=element.value; //INR //EUR
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;

};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updatExchangeRate();
    
});

const updatExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval < 1){
        amtval=1;
        amount.value="1";
    }


   const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;  //EXCHANEGE rate
   let response=await fetch(URL);
   let data=await response.json();
   let rate=data[toCurr.value.toLowerCase()];
   console.log(rate);

   let finalAmount=amtval*rate;
   msg.innerText=`${amtval} ${fromCurr.value}=${finalAmount} ${toCurr.value}`

};

window.addEventListener("load",async ()=>{
    updatExchangeRate();
  
  });

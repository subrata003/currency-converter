const baseurl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdown=document.querySelectorAll(".dropdown select")
const button=document.querySelector("form button")
const formcurr=document.querySelector(".from select")
const tocurr=document.querySelector(".to select")
const final=document.querySelector(".final")




for(let select of dropdown){
        
 for(code in countryList) {
       let newOption=document.createElement("option")
       newOption.innerText= code;
       newOption.value=code;
       if(select.name==="from" && code==="USD"){
        newOption.selected="selected"
       } else if(select.name==="to" && code==="INR"){
        newOption.selected="selected"
       }
       select.append(newOption);
      
 }
 select.addEventListener("change",(evt)=>{
        flag(evt.target)
 })

}
const flag=(ele)=>{
        let code=ele.value
        let ccode=countryList[code]
        let newlink=`https://flagsapi.com/${ccode}/flat/64.png`
        let img=ele.parentElement.querySelector("img")
        img.src=newlink
        

}
button.addEventListener("click",async(evt)=>{
        evt.preventDefault();
        let amount=document.querySelector(".amout input")
        let amtvalue=amount.value
       if(amtvalue===""|| amtvalue<1){
        amtvalue=1;
        amount.value="1";
       }
//        console.log(formcurr.value,tocurr.value)
       const URL=`${baseurl}/${formcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`
       let response=await fetch(URL)
       let data=await response.json()
       let rate=data[tocurr.value.toLowerCase()]
       let finalamount=amtvalue*rate
       final.innerText=`${amtvalue} ${formcurr.value} = ${finalamount} ${tocurr.value}`

})

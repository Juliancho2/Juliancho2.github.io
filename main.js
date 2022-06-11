const d = document;
const $listSection= d.querySelectorAll("[data-scroll-spy]");
const observer  = new IntersectionObserver(callback,{threshold: [0.3, 0.9]});

$listSection.forEach(el=>{
    observer.observe(el);

});
function callback(entries){
    let $listHeader=document.querySelectorAll("#list-header li a")
    entries.forEach(element=>{
        if(element.isIntersecting){
            
           $listHeader.forEach(el=>{
               //console.log(el.classList[0]);
            if(element.target.id == el.classList[0])  el.classList.add("scroll-spy");
            else el.classList.remove("scroll-spy")

           })
       
        }
    })
}

///////////////////////////////////////////////////////////////////////7////

// ____________________________form-container___________________________________

const $formContainer=d.querySelector(".form-contact");
    let regExp;
$formContainer.addEventListener("keyup",(e)=>{
    if(e.target == $formContainer.name){
        regExp= /[1-9]/i;
       
        if (regExp.test($formContainer.name.value) && $formContainer.name.value.length >= 1) {
            d.querySelector(".response-form").style.display="block"
            d. querySelector(".response-form p").textContent="* El nombre es incorrecto";
  

        } else d.querySelector(".response-form").style.display="none";
        
    };
    if(e.target == $formContainer.email){
        regExp= /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        
        if (!regExp.test($formContainer.email.value) && $formContainer.email.value.length >= 1 ) {
            d.querySelector(".response-form").style.display="block";
            d. querySelector(".response-form p").textContent="* El email es incorrecto"
           }else d.querySelector(".response-form").style.display="none";
    };
    if(e.target == $formContainer.message){
        regExp= new RegExp($formContainer.message.pattern);
        if ($formContainer.message.value.length > 50 ) {
            d.querySelector(".response-form").style.display="block";
            d. querySelector(".response-form p").textContent="* El mensaje es incorrecto";
  

        } else  d.querySelector(".response-form").style.display="none";
        
    };
});
$formContainer.addEventListener("submit",(e)=>{
    e.preventDefault();
    d.querySelector(".spinner-4").style.display="block";
    fetch("https://formsubmit.co/ajax/julianmoreno242@gmail.com",{
    method: "POST",
   body: new FormData($formContainer)
})
    .then(response => {
        response.ok ? response.json()
                :Promise.reject(response)
    })
    .then(response => {
        d.querySelector(".spinner-4").style.display="none";
        d.querySelector(".message-success").style.display="block";
        $formContainer.reset();
        console.log(response);
        
    })
    .catch(error => {
        let message= error.statusText || "Ups parece que ocurrio un error";
        d.querySelector(".spinner-4").style.display="none";
        d.querySelector(".message-success").style.display="block";
        d.querySelector(".message-success p").textContent=`Error: ${message}`;
        
    })
    .finally(()=>{
        setTimeout(() => {
            d.querySelector(".message-success").style.display="none";
        }, 5000);
    })
    
});
////////////////////////////////////////////////////////////////7











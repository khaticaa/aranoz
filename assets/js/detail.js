let detail = document.querySelector(".detail");


let id=new URLSearchParams(window.location.search).get("id");

fetch(`http://localhost:3000/data/${id}`)
.then(res=>res.json())
.then(element=>{
        detail.innerHTML+=`
        <div class="s2bot">
                 <div class="s2img">
                  <img src="${element.img}" alt="">
                </div>
                <div class="s2bottxt">
                  <h4>${element.name}</h4>
                <h3>
                  ${element.description}
                </h3>

                <button onclick="Back(${element.id})">Main Page</button>
                </div>
                </div>

        
        `
    });
function Back(){
    window.location="index.html"
  
}
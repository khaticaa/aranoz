let id=new URLSearchParams(window.location.search).get("id");
const favcard=document.querySelector(".favcard")

fetch(`http://localhost:3000/favorites/`)
.then(res=>res.json())
.then(data=>{
  data.forEach(element => {
    favcard.innerHTML+=`
    <div class="s2bot">
    <div class="s2img">
      <img src="${element.img}" alt="">
    </div>
    <div class="s2bottxt">
      <h4>${element.name}</h4>
    <h3>
      ${element.description}
    </h3>
    <button onclick="deleteCard(${element.id})" class="delete">Delete</button>
    </div>
           
    `
  });
})

function deleteCard(id){
    axios.delete(`http://localhost:3000/favorites/${id}`)
}


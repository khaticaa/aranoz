let id = new URLSearchParams(window.location.search).get("id");

const url = `http://localhost:3000/data/`;


let name  = document.querySelector('#name');
// let category = document.querySelector('.category');
let modalImage = document.querySelector('.modalImage');
let categoryForm = document.querySelector('.category-form');
let submit = document.querySelector('.submit');
let content = document.querySelector('#content');
let file = document.querySelector('input[type="file"]');

fetch(url+id)
.then(res => res.json())
.then(data => {
    modalImage.src = data.img;
    name.value = data.name;
    category.value = data.description;

})

file.addEventListener('input', (e) => {
    let file = e.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            modalImage.src = reader.result;
        }
    }
})

categoryForm.addEventListener("submit", (event) => {
    event.preventDefault()
    axios.put(url+id , {
        img: modalImage.src,
        name: name.value,
        description: category.value,
      
    })
    .then(res=>{
        window.location="./index.html"
    })
})
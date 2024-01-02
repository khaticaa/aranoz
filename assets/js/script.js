let page = 8;
let firstArr = [];
let secondArr = [];
let searchInput = document.querySelector("#searchBtn");
let sortBtn = document.querySelector("#sortButton");
let sorted = "descending";

function loadMore() {
  const s2bottom = document.querySelector(".s2bottom");
  fetch(`http://localhost:3000/data`)
    .then((res) => res.json())
    .then((data) => {
      secondArr = data;
      firstArr = firstArr.length || searchInput.value ? firstArr : data;
      axios.get(`http://localhost:3000/favorites`).then((favElements) => {
        firstArr.slice(0, page).forEach((element) => {
          if (favElements.data.find((f) => f.id === element.id)) {
            s2bottom.innerHTML += `
                <div class="s2bot">
                <i class="bi bi-heart-fill" id="favorite" style ="color:red" onClick='DeleteFav(${element.id})'></i>
                 <div class="s2img">
                  <img src="${element.img}" alt="">
                </div>
                <div class="s2bottxt">
                  <h4>${element.name}</h4>
                <h3>
                  ${element.description}
                </h3>
                <div class="Crud"
                <button onclick="DetailsButton(${element.id})">Details</button>
                <button onclick="DeleteButton(${element.id})">Delete</button>
                <button onclick="UpdateButton(${element.id})">Update</button>
                </div>
              </div>
                
                `;
          } else {
            s2bottom.innerHTML += `

                <div class="s2bot">
                <i class="bi bi-heart" id="favorite"  onClick='addFavorite(${element.id})'></i>
                <div class="s2img">
                  <img src="${element.img}" alt="">
                </div>
                <div class="s2bottxt">
                  <h4>${element.name}</h4>
                <h3>
                  ${element.description}
                </h3>
                </div>
                <div class="Crud">
                <button onclick="DetailsButton(${element.id})">Details</button>
                <button onclick="DeleteButton(${element.id})">Delete</button>
                <button onclick="UpdateButton(${element.id})">Update</button>
                </div>
              </div>
            
                `;
          }
        });
      });
    });
}
loadMore();

searchInput.addEventListener("input", function (e) {
  firstArr = secondArr;
  firstArr = firstArr.filter((element) =>
    element.name
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  loadMore();
});

sortBtn.addEventListener("click", function () {
  if (sorted === "ascending") {
    firstArr.sort((a, b) =>
      parseFloat(
        b.description.replace("$", "") - a.description.replace("$", "")
      )
    );
    sorted = "descending";
    sortBtn.innerHTML = "SORT ASC";
  } else if (sorted === "descending") {
    firstArr.sort((a, b) =>
      parseFloat(
        a.description.replace("$", "") - b.description.replace("$", "")
      )
    );
    sorted = "def";
    sortBtn.innerHTML = "SORT DSC";
  } else {
    firstArr = secondArr;
    sorted = "ascending";
    sortBtn.innerHTML = "SORT";
  }
  loadMore();
});

const Loadmore = document.querySelector(".Loadmore");
Loadmore.addEventListener("click", () => {
  page += 8;
  loadMore();
});

function DeleteButton(id) {
  axios.delete(`http://localhost:3000/data/${id}`);
  window.location.reload();
}

function DetailsButton(id) {
  window.location = `details.html?id=${id}`;
}

function UpdateButton(id) {
  window.location = `./update.html?id=${id}`;
}


function addFavorite(id) {
  axios.get(`http://localhost:3000/data/${id}`).then((res) => {
    axios.post(`http://localhost:3000/favorites`, res.data);
    axios.post(`./favorite.html`, res.data);

    window.location = `./favorite.html?id=${id}`;
  });
}





const menu = document.querySelector(".navbar-toggler");
const navbar = document.querySelector(".navbar-collapse");

menu.addEventListener("click", () => {
  const currentBgColor = navbar.style.backgroundColor;

  if (!currentBgColor || currentBgColor === "transparent" || currentBgColor === "rgba(0, 0, 0, 0)") {
    navbar.style.backgroundColor = "";
    navbar.style.padding ='5px';
  } else {
    navbar.style.backgroundColor = "transparent";
  }
});

// const nav = document.querySelector(".container-fluid");

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 250) {
//     nav.classList.add("position-sticky");
//     nav.style.top = "0px";
//     nav.style.left = "0px";
  
//   } else {
//     nav.classList.remove("position-sticky");
//     nav.classList.add("position-absolute");
//     nav.style.background = "";
//   }
// });


let TopButton=document.querySelector(".topbutton");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    TopButton.style.display = "block";
  } else {
    TopButton.style.display = "";
  }
});

TopButton.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth"
  })
})
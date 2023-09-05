let infoEvents = document.getElementById('infoEvents');
let categorias = document.getElementById('categorias');
let buscador = document.querySelector('input[name=busqueda]');


let categories = data.events.map(evento => evento.category);
let newCategories = categories.filter((item,index) => {
    return categories.indexOf(item) === index;
});


showCards(data.events,infoEvents);

createChecksCategory(newCategories,categorias);

buscador.addEventListener("input", filterDoble)
categorias.addEventListener("change", filterDoble)

function createCard(elemento){
  return ` <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
  <div class="card">
      <img src="${elemento.image}" class="card-img-top" alt="${elemento.name}" height="200">
      <div class="card-body">
          <h5 class="card-title">${elemento.name}</h5>
          <p class="card-text">${elemento.description}</p>
          <div class="d-flex flex-row justify-content-between">
              <p>Price: ${elemento.price}</p>
              <a href="./details.html?id=${elemento._id}" class="btn btn-primary">Details</a>
          </div>
      </div>
  </div>
</div>`
};
function showCards(array, idCard){
  if(array.length == 0){
    idCard.innerHTML = `<h2> No se encontraron elementos</h2 >`
    return
  }
  let html = "";
  array.forEach(elemento => {
    html += createCard(elemento)
  });
  idCard.innerHTML = html
};


function createChecksCategory(array, idCard){
  let html ="";
  let i=0;
  for (const iterator of array) {
      let checkCategory = `
          <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox${i}" value="${iterator}">
              <label class="form-check-label" for="inlineCheckbox${i}">${iterator}</label>
          </div>`;
      html += checkCategory;
      i = i+1;
      // console.log(checkCategory);
  };
  idCard.innerHTML = html;
};
function filterBySearch(array,text){
  let arrayBySearch = array.filter(elemento => elemento.name.toLowerCase().includes(text.trim().toLowerCase()))
  return arrayBySearch
};
function filterByCheckCategory(array){
  let checkboxes = Array.from(document.querySelectorAll(".form-check-input"));
  let checkboxesBlue = checkboxes.filter(check => check.checked)
  if(checkboxesBlue == 0){
    return array
  }
  let valores = checkboxesBlue.map(chTr => chTr.value)
  let filterArray = array.filter(evento => valores.includes(evento.category))
  return filterArray
}
// function filterDoble(){
//   let filterByCat = filterByCheckCategory(data.events)
//   let filterByText = filterBySearch(filterByCat, buscador.value)

//   showCards(filterByText,infoEvents)
// }
function filterDoble(){
  let filterByCat = filterByCheckCategory(data.events)
  let filterByText = filterBySearch(filterByCat, buscador.value)
  let contenedor=infoEvents
  showCards(filterByText,contenedor)
};
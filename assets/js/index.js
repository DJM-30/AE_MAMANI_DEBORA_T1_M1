// let infoEvents = document.getElementById('infoEvents');
// let categorias = document.getElementById('categorias');
let buscador = document.querySelector('input[name=busqueda]');

obtenerApi(cargas);

function cargas(eventos){

    // console.log(eventos);
    showCategories(tiposCategorias);
    showCards(eventos);
}

buscador.addEventListener("input",filterDoble)
categorias.addEventListener("change",filterDoble)


function showCategories(tiposCategorias) {
    let categorias = document.getElementById('categorias');
    let html="";
    let i=0;
    for (const tipo of tiposCategorias) {
        let checkCategory =`<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox${i}" value="${tipo}">
        <label class="form-check-label" for="inlineCheckbox${i}">${tipo}</label>
        </div>`;
        html+=checkCategory;
        i=i+1;   
    };
    categorias.innerHTML = html;
}

function showCards(eventos){
    let infoEvents = document.getElementById('infoEvents');
    if (eventos.length == 0) {
        infoEvents.innerHTML = `<h2> No se encontraron elementos</h2 >`
        return
    }
    let html="";
    eventos.forEach(evento => {
        html+= createCard(evento)
    });
    infoEvents.innerHTML = html;
}
function createCard(evento){
    return ` <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
    <div class="card">
        <img src="${evento.image}" class="card-img-top" alt="${evento.name}" height="200">
        <div class="card-body">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text">${evento.description}</p>
            <div class="d-flex flex-row justify-content-between">
                <p>Price: ${evento.price}</p>
                <a href="./details.html?id=${evento._id}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>
  </div>`;
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
    let filterByCat = filterByCheckCategory(eventos)
    let filterByText = filterBySearch(filterByCat, buscador.value)
    showCards(filterByText,infoEvents)
};
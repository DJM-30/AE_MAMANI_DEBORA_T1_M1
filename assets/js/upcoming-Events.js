let arrayEventosFuturos=[];
let futureEvents;
let buscador = document.querySelector('input[name=busqueda]');

obtenerApi(cargasFutureEvents);

function cargasFutureEvents(eventos){

    futureEvents = obtenerFutureEvents(eventos);
    console.log(futureEvents);
    showCategories(tiposCategorias);
    showCards(futureEvents);
}

buscador.addEventListener("input",filterDoble);
categorias.addEventListener("change",filterDoble);

function obtenerFutureEvents(eventos){
    arrayEventosFuturos = eventos.filter((evento)=>{
        return evento.date > dateBase;
    })
    return arrayEventosFuturos;
}

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
};

function showCards(futureEvents){
    let upcomingEvents = document.getElementById('upcomingEvents');
    if (futureEvents.length == 0) {
        upcomingEvents.innerHTML = `<h2> No se encontraron elementos</h2 >`
        return
    }
    let html="";
    futureEvents.forEach(evento => {
        html+= createCard(evento)
    });
    upcomingEvents.innerHTML = html;
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
function filterDoble(){
    let filterByCat = filterByCheckCategory(futureEvents);
    let filterByText = filterBySearch(filterByCat, buscador.value);
    showCards(filterByText,upcomingEvents);
};

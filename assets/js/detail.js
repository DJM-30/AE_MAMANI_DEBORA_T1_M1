let param = new URLSearchParams(window.location.search)
let id = param.get("id")

let contenedor = document.getElementById("contenedor")
let eventos = Array.from(data.events)
// console.log(eventos)
let evento = searchEvent(id)

showCardEvent(evento,contenedor);

function searchEvent(id){
    return eventos.find(evento => evento._id == id)
}

function createEventDetail(elemento){

    if (elemento.date> data.currentDate) {
        return `<div class="card mb-3 carDetails">
        <img src="${elemento.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Nombre: ${elemento.name}</h5>
            <p class="card-text">Categoria: ${elemento.category}</p>
            <p class="card-text">${elemento.description}</p>
            <p class="card-text">Capacidad:${elemento.capacity}</p>
            <p class="card-text"><small class="text-body-secondary">${elemento.date}</small></p>
        </div>
    </div> `
    };
    if (elemento.date< data.currentDate) {
        return `<div class="card mb-3 carDetails">
        <img src="${elemento.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Nombre: ${elemento.name}</h5>
            <p class="card-text">Categoria: ${elemento.category}</p>
            <p class="card-text">${elemento.description}</p>
            <p class="card-text">Asistencia:${elemento.capacity}</p>
            <p class="card-text"><small class="text-body-secondary">${elemento.date}</small></p>
        </div>
    </div> `
    }
    
}
function showCardEvent(elemento,contenedor){
    contenedor.innerHTML = createEventDetail(elemento)
}
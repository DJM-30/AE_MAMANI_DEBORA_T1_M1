let param = new URLSearchParams(window.location.search);
let id = param.get("id");

let contenedor = document.getElementById("contenedor");

obtenerApi(showDetail);

function showDetail(eventos){
    console.log(eventos)
    let evento=searchEvent(id)
    let elemento=(createEventDetail(evento))
    contenedor.innerHTML = elemento;
}

function searchEvent(id){
    return eventos.find(evento => evento._id == id);
}

function createEventDetail(evento){
    let fechaEvento = evento.date;
    let fechaCurrent = dateBase;
    
        if (fechaEvento > fechaCurrent) {
            return `<div class="card mb-3 carDetails">
            <img src="${evento.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${evento.name}</h5>
                <p class="card-text">Category: ${evento.category}</p>
                <p class="card-text">${evento.description}</p>
                <p class="card-text">Capacity: ${evento.capacity}</p>
                <p class="card-text"><small class="text-body-secondary">${evento.date}</small></p>
            </div>
        </div> `
        };
        if (fechaEvento < fechaCurrent) {
            return `<div class="card mb-3 carDetails">
            <img src="${evento.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${evento.name}</h5>
                <p class="card-text">Category: ${evento.category}</p>
                <p class="card-text">${evento.description}</p>
                <p class="card-text">Attendance: ${evento.capacity}</p>
                <p class="card-text"><small class="text-body-secondary">${evento.date}</small></p>
            </div>
        </div> `
        };
        
}
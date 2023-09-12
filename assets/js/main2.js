let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';
let eventos = [];
let tiposCategorias = [];
let dateBase;

async function obtenerApi(callback){
    try {
        let respuesta = await fetch(urlApi);
        let dataApi = await respuesta.json();
        // eventos = dataApi.events;
        // console.log(dataApi);
        dateBase= dataApi.currentDate;
        console.log(dateBase);
        for (const evento of dataApi.events) {
            eventos.push(evento)
        }
        console.log(eventos);
        tiposCategorias = obtenerCategorias(eventos);
        console.log(tiposCategorias);
        
        callback(eventos);

    } catch (error) {
        console.log(error)
    }
}

// obtenerApi();

function obtenerCategorias(array){
    let arrayAllCategorias = array.map(evento => evento.category);
    arrayCategory = arrayAllCategorias.filter((item,index)=> {
        return arrayAllCategorias.indexOf(item) === index;
    });
    return arrayCategory;
};
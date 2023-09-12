let totalAsistencia = 0;
let porcEvento = 0;

let totalAsistenciaUpcoming=0;
let porcUpcoming=0;

let eventosConAsistencia=[];
let tresMayoresAss=[];
let tresMenoresAss=[];
let tresCapacity=[];

let arrayEventosFuturos=[];
let arrayEventosPasados=[];



obtenerApi(llenarTablas);

function llenarTablas(eventos){
    llenarEventStatics(eventos);
    llenarUpcomingStatics(eventos);
    llenarPastStatics(eventos);
    // obtenerMAYPorAss(eventos);
    // obtenerTRESMAY()
    // obtenerTRESMEN()
}

function llenarEventStatics(eventos){
    obtenerMAYPorAss(eventos);
    let eventStatics = document.getElementById('eventStatics')
    let tbodyHTML ="";
    let mayAsis = obtenerTRESMAY(eventos);
    let menAsis = obtenerTRESMEN(eventos);
    let mayCapa = obtenerTRESCAP(eventos);
    for (let index = 0; index < mayAsis.length; index++) {
        tbodyHTML+=`<tr>
        <td>${mayAsis[index].name}</td>
        <td>${menAsis[index].name}</td>
        <td>${mayCapa[index].name}</td>
    </tr>`;
    }
    eventStatics.innerHTML = tbodyHTML;
}


function obtenerMAYPorAss(eventos){
    let listaNamePor=[];
    eventosConAsistencia = obtenerEventosConAsis(eventos);
    for (const evento of eventosConAsistencia){
        totalAsistencia += evento.assistance;
    }
    
    console.log(totalAsistencia);
    
    for (const evento of eventosConAsistencia){
        porcEvento = (evento.assistance * 100)/ totalAsistencia;
        listaNamePor.push({
            name: evento.name,
            porcentaje: porcEvento.toFixed(2)
        });
    }
    console.log('la lista:',listaNamePor);
    return listaNamePor;
};

function obtenerEventosConAsis(eventos){
   return eventos.filter(evento => evento.assistance !== undefined);
}
function obtenerTRESMAY(eventos){
    let listaM = obtenerMAYPorAss(eventos);
    listaM.sort((a,b)=> b.porcentaje - a.porcentaje);
    tresMayoresAss = listaM.slice(0,3);
    console.log(tresMayoresAss)
    return tresMayoresAss;
}
function obtenerTRESMEN(eventos){
    let listaN = obtenerMAYPorAss(eventos)
    listaN.sort((a,b)=> a.porcentaje - b.porcentaje);
    tresMenoresAss = listaN.slice(0,3);
    console.log(tresMenoresAss)
    return tresMenoresAss;
}
function obtenerTRESCAP(eventos){
    let listaC = eventos.sort((a,b)=> b.capacity - a.capacity);
    tresCapacity = listaC.slice(0,3);
    return tresCapacity;
}

function llenarUpcomingStatics(eventos) {
    let futureEvents=[];
    let totalAttendace=0;
    let upcomingStatics = document.getElementById('upcomingStatics')
    futureEvents = obtenerFuturosEventos(eventos);
    for (const category in futureEvents) {
       totalAttendace+= futureEvents[category].attendance
    }
    console.log('tot asis futu',totalAttendace);

    for (const category in futureEvents) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${category}</td>
        <td>$${futureEvents[category].revenue.toFixed(2)}</td>
        <td>${((futureEvents[category].attendance *100)/totalAttendace).toFixed(2)}%</td>
        `;
        upcomingStatics.appendChild(row);
    }
    console.log(futureEvents);
}

function obtenerFuturosEventos(eventos){
    let arraxCat =[];
    arrayEventosFuturos = eventos.filter((evento)=>{
        if (evento.date > dateBase){
            const category = evento.category;
            const revenue = evento.price * evento.estimate;
            const capacity= evento.capacity;
            if (category in arraxCat) {
                arraxCat[category].revenue += revenue;
                arraxCat[category].attendance += evento.estimate;
                arraxCat[category].capacity += capacity;
            } else {
                arraxCat[category] = {
                    revenue: revenue,
                    attendance: evento.estimate,
                    capacity: evento.capacity,
                };
            }
        } 
    })
    return arraxCat;
}

function llenarPastStatics(eventos) {
    let pastEvents=[];
    let totalAttendaceP=0;

    let pastStatics = document.getElementById('pastStatics')
    pastEvents = obtenerPastEvents(eventos);
    for (const categoryP in pastEvents) {
        totalAttendaceP+= pastEvents[categoryP].attendanceP
    }
     console.log('tot asis past',totalAttendaceP);

    for (const category in pastEvents) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${category}</td>
        <td>$${pastEvents[category].revenueP}</td>
        <td>${((pastEvents[category].attendanceP*100)/totalAttendaceP).toFixed(2)}%</td>
        `;
        pastStatics.appendChild(row);

    }
    console.log('listadepasados',pastEvents);
}

function obtenerPastEvents(eventos) {
    let arryPastEvents=[];

    arrayEventosPasados=eventos.filter((evento)=>{
        if (evento.date < dateBase){
            const categoryP = evento.category;
            const revenueP = evento.price*evento.assistance;
            const capacityP=evento.capacity;
            // const assistanceP = evento.assistance;
            if (categoryP in arryPastEvents){
                arryPastEvents[categoryP].revenueP+=revenueP;
                arryPastEvents[categoryP].assistanceP+=evento.assistance;
                arryPastEvents[categoryP].capacity+=capacityP;
            } else {
                arryPastEvents[categoryP] = {
                    revenueP: revenueP,
                    attendanceP: evento.assistance,
                    capacityP: evento.capacity,
                }
            }
        }
    })
    return arryPastEvents;
    
}
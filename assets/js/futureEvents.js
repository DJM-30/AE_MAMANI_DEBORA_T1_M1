let upcomingEvents = document.getElementById('upcomingEvents');

let futureEvents = data.events.filter((elemento)=> {
  return elemento.date > data.currentDate;
})


showCards(futureEvents,upcomingEvents);
createChecksCategory(newCategories,categorias);


// function filterBySearch(array,text){
//   let arrayBySearch = array.filter(elemento => elemento.name.toLowerCase().includes(text.trim().toLowerCase()))
//   return arrayBySearch
// };
// function filterByCheckCategory(array){
//   let checkboxes = Array.from(document.querySelectorAll(".form-check-input"));
//   let checkboxesBlue = checkboxes.filter(check => check.checked)
//   if(checkboxesBlue == 0){
//     return array
//   }
//   let valores = checkboxesBlue.map(chTr => chTr.value)
//   let filterArray = array.filter(evento => valores.includes(evento.category))
//   return filterArray
// };

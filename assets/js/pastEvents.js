let paEvents = document.getElementById('pastEvents');


let pastEvents = data.events.filter((elemento)=> {
  return elemento.date < data.currentDate
})

showCards(pastEvents,paEvents)
createChecksCategory(newCategories,categorias);


document.addEventListener('DOMContentLoaded', () => {
  ShowAdapter.all()
  document.addEventListener('click', (e)=>{
    if (e.target.id === 'show-list-name'){
      const show = Show.findShowByName(e.target.innerHTML)[0]
      let showEl = document.getElementById('show-display')
      showEl.innerHTML = `<button class="w3-btn w3-large w3-padding-small w3-teal">${show.name}</button>`
    }

  })



})


function populateShowDD(){
  Show.all.forEach((s) =>{
    let showsEl = document.getElementById('dropdown-content')
    showsEl.appen
  })
}

class Show {
  constructor(hash){
    this.name = hash.name
    this.id = hash.id
    Show.all.push(this)
  }

  roles(){
    return Role.all.filter((r) =>{
      return r.showId === this.id
    })
  }

  scenes(){
    return Scene.all.filter((s) => {
      return s.showId === this.id
    })
  }
}
// SHOW CLASS METHODS
Show.all = []

Show.findShowByName = (name) => {
  return Show.all.filter((s) =>{
    return s.name === name
  })
}

class ShowAdapter{

  static all(){
    fetch('http://localhost:3000/api/v1/shows')
      .then(resp => resp.json())
      .then(json => populateShows(json))
  }
}

function populateShows(json){
  json.forEach((hash) =>{
    new Show(hash)
  })
  let showEl = document.getElementById('shows')
  Show.all.forEach((s) =>{
    showEl.innerHTML += `<a id="show-list-name" href="#">${s.name}</a>`
  })
}

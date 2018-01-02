class Show {
  constructor(name){
    this.title = name
    Show.all.push(this)
  }

  roles(){
    return Role.all.filter((r) =>{
      return r.showId === this.id
    })
  }

  actIScenes(){
    let actScene = Scene.all.filter((s) => {
      return s.act === 1
    })
    return actScene.filter((s)=>{
      return s.showId === this.id
    }).sort(function(a, b){return a.number - b.number})
  }

  actIIScenes(){
    let actScene = Scene.all.filter((s) => {
      return s.act === 2
    })
    return actScene.filter((s)=>{
      return s.showId === this.id
    }).sort(function(a, b){return a.number - b.number})
  }

}
// SHOW CLASS METHODS
Show.all = []

Show.findShowByName = (name) => {
  return Show.all.filter((s) =>{
    return s.title === name
  })
}

Show.findShowById = (id) => {
  return Show.all.filter((s) =>{
    return s.id === id
  })
}

class ShowAdapter{

  static all(){
    fetch('http://localhost:3000/api/v1/shows')
      .then(resp => resp.json())
      .then(json => populateShows(json))
  }

  static create(title){
    const params = {
          "method": "POST",
          "headers": {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          "body": JSON.stringify({title: title})
        }
      return fetch('http://localhost:3000/api/v1/shows', params)
        .then(resp => resp.json())
        .then(json => createShowObj(json))
      }
}

//HELPER METHODS

function populateShows(json){
  json.forEach((hash) =>{
    let newShow = new Show(hash.name)
    newShow.id = hash.id
  })
  let showEl = document.getElementById('shows')
  Show.all.forEach((s) =>{
    showEl.innerHTML += `<a id="show-list-name" href="#">${s.title}</a>`
  })
}

function createShowObj(json){
//create show object
  let newShow = new Show(json.name)
  newShow.id = json.id
//populate drop down menu
  let showEl = document.getElementById('shows')
  showEl.innerHTML += `<a id="show-list-name" href="#">${newShow.title}</a></li><li class="divider">`
}

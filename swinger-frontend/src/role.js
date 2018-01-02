class Role {
  constructor(name, showId){
    this.name = name
    this.showId = showId
    Role.all.push(this)
  }

  notes(){
    return Note.all.filter((n)=>{
      return n.roleId === this.id
    })
  }

  scenes(){
    return this.notes().map((n)=>{
      return n.scene()
    })[0]
  }

}

Role.all = []

Role.findRoleByName = (name) =>{
  return Role.all.filter((r) =>{
    return r.name === name
  })
}

class RoleAdapter {
  static all(){
    fetch('http://localhost:3000/api/v1/roles')
    .then(resp => resp.json())
    .then(json => populateRoles(json))
  }

  static create(name, showTitle){
    const params = {
          "method": "POST",
          "headers": {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          "body": JSON.stringify({name: name, show: showTitle})
        }
      return fetch('http://localhost:3000/api/v1/roles', params)
        .then(resp => resp.json())
        .then(json => createRoleObj(json))
      }

}

//HELPER METHODS

function populateRoles(json){
  json.forEach((hash) =>{
    let newRole = new Role(hash.name, hash.show_id)
    newRole.id = hash.id
  })
}

function createRoleObj(json){
  let newRole = new Role(json.name, json.show_id)
  newRole.id = json.id
}

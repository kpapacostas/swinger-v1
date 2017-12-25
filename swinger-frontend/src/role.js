class Role {
  constructor(name, show){
    this.name = name
    this.showId = show.id
    Role.all.push(this)
  }

}

Role.all = []

class RoleAdapter {

  
}

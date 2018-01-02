class Note {
    constructor(sceneId, roleId, body = ""){
      this.sceneId = sceneId
      this.roleId = roleId
      this.body = body
      Note.all.push(this)
    }

    scene(){
      return Scene.all.filter((s)=>{
        return s.id === this.sceneId
      })[0]
    }

    role(){
      return Role.all.filter((r)=>{
        return r.id === this.roleId
      })[0]
    }
  }

Note.all = []




class NoteAdapter {

  static all(){
    fetch('http://localhost:3000/api/v1/notes')
    .then(resp => resp.json())
    .then(json => populateNotes(json))
  }

  static create(scene, role, body){
    const params = {
          "method": "POST",
          "headers": {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          "body": JSON.stringify({scene_id: scene.id, role_id: role.id, body: body})
        }
      return fetch('http://localhost:3000/api/v1/notes', params)
        .then(resp => resp.json())
        .then(json => createNoteObj(json))
      }


}

//HELPER METHODS

function populateNotes(json){
  json.forEach((hash)=>{
    let newNote = new Note(hash.scene_id, hash.role_id, hash.body)
    newNote.id = hash.id
  })
}

function createNoteObj(json){
  let newNote = new Note(json.scene_id, json.role_id, json.body)
  newNote.id = json.id
}

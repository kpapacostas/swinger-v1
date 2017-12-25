class Note {
    constructor(scene, role){
      this.sceneId = scene.id
      this.roleId = role.id
      Note.all.push(this)
    }
  }

Note.all = []


class NoteAdapter {


}

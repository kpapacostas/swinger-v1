class Scene {
  constructor(number, act, showId){
    this.number = number
    this.act = act
    this.showId = showId
    Scene.all.push(this)
  }

}

Scene.all = []


class SceneAdapter {

  static all(){
    fetch('http://localhost:3000/api/v1/scenes')
    .then(resp => resp.json())
    .then(json => populateScenes(json))
  }

  static create(number, act, showTitle){
    const params = {
          "method": "POST",
          "headers": {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          "body": JSON.stringify({number: number, act: act, show: showTitle})
        }
      return fetch('http://localhost:3000/api/v1/scenes', params)
        .then(resp => resp.json())
        .then(json => createSceneObj(json))
      }


}

//HELPER METHODS

function populateScenes(json){
  json.forEach((hash) =>{
    let newScene = new Scene(hash.number, hash.act, hash.show_id)
    newScene.id = hash.id
  })
}

function createSceneObj(json){
  let newScene = new Scene(json.number, json.act, json.show_id)
  newScene.id = json.id
}

document.addEventListener('DOMContentLoaded', () => {
  ShowAdapter.all()
  RoleAdapter.all()
  SceneAdapter.all()
  NoteAdapter.all()

  document.addEventListener('click', (e)=>{
    if (e.target.id === 'show-list-name'){
      let header = document.getElementById('header')
      let show = Show.findShowByName(e.target.innerHTML)[0]
      let showEl = document.getElementById('show-display')
      let rolesDisplay = document.createElement('DIV')

      rolesDisplay.innerHTML = `
      <div class="row">
        <div class="col-lg-12 card-border w3-blue text-center">
        <h2 id="role-name">${show.title}</h2><br/>
        </div>
      </div>
        <br/><h2 class="panel panel-default-info"> Roles</h2>`
      show.roles().forEach((r) =>{
        rolesDisplay.innerHTML += `
        <a href="#" class="w3-button" name="${show.title}" id="see-role" >${r.name}</a><br/>
        ` })

        let actsDisplay = document.createElement('DIV')

        actsDisplay.innerHTML = `
        <br/><div class="row">
            <div class="col-sm-6" id="actI-scenes">
              <h3>Act I</h3>
            </div>
            <div class="col-sm-6" id="actII-scenes">
              <h3>Act I</h3>
            </div>
        </div> <br/> <br/> `
        while (showEl.firstChild) {
          showEl.removeChild(showEl.firstChild);
        }

        showEl.append(rolesDisplay, actsDisplay)
        transitionPage(header, showEl)


        show.actIScenes().forEach((s) =>{
          document.getElementById('actI-scenes').innerHTML += `
            <br/><a href="#" class="col-sm-4 text-center" id="see-scene" >Scene ${s.number}</a><br/>
        ` })

        show.actIIScenes().forEach((s) =>{
          document.getElementById('actII-scenes').innerHTML += `
            <br/><a href="#" class="col-sm-4 text-center" id="see-scene" >Scene ${s.number}</a><br/>
        ` })

    }

//SUBMIT SHOW TITLE
    if (e.target.id === 'submit-show'){
      e.preventDefault()
      let showTitle = document.getElementById("show-title").value
      ShowAdapter.create(showTitle)

      let formEl = document.getElementById('show-display')
      formEl.innerHTML = `<h2>Show Details</h2>
      <form id="create-show-info" class="" action="#" method="post">
        <br/><h6>Number of Scenes in Act I:</h6>
          <input class="" type="text" id="num-of-scenes-actI" name="show-title"><br /><br />
        <h6>Number of Scenes in Act II:</h6>
          <input class="" type="text" id="num-of-scenes-actII" name="show-title"><br /><br />
        <div id="new-roles-input">
          <h6>Roles You Cover:</h6><br />
            <input class="role" type="text" id="new-role" placeholder="Character Name"><br /><br />
        </div>
        <br/><br/><button id="add-role">Add Role +</button><br /><br />
        <button class="" id="submit-show-info">Submit Show Info</button>
      </form>`

    }

//ADD ROLE TO SHOW INFO

    if (e.target.id === 'add-role'){
      e.preventDefault()
      let rolesEl = document.getElementById('new-roles-input')
      let newInput = document.createElement('DIV')
      newInput.innerHTML = `<input class="role" type="text" id="show-role" name="show-title" placeholder="Character Name"><br /><br />`
      rolesEl.appendChild(newInput)
    }

//SUBMIT SHOW INFO
    if (e.target.id === 'submit-show-info'){
      e.preventDefault()
      let showTitle = Show.all[Show.all.length -1].title
      let showRoles = Array.from(document.getElementsByClassName("role"))
      showRoles.forEach((s) =>{
        RoleAdapter.create(s.value, showTitle)
      })

      let actIScenes = parseInt(document.getElementById('num-of-scenes-actI').value)
      createScenes(actIScenes, 1, showTitle)

      let actIIScenes = parseInt(document.getElementById('num-of-scenes-actII').value)
      createScenes(actIIScenes, 2, showTitle)

      let showEl = document.getElementById('show-display')
      showEl.innerHTML = `<a href="#" class="w3-bar-item w3-button" name="${showTitle}" id="new-show-view" >View your new show!</a>`

    }

//DISPLAY SHOW INFO
    if (e.target.id === 'new-show-view'){
      let header = document.getElementById('header')
      let showTitle = e.target.name
      let show = Show.findShowByName(showTitle)[0]
      let showEl = document.getElementById('show-display')
      let rolesDisplay = document.createElement('DIV')
      rolesDisplay.innerHTML = `
      <div class="row jumbotron">
        <div class="col-lg-12 card-border w3-blue">
        <h2 id="role-name">${show.title}</h2><br/>
        </div>
      </div>
        <br/><h3>Roles:</h3>
      `
      show.roles().forEach((r) =>{
        rolesDisplay.innerHTML += `
        <a href="#" class="w3-bar-item w3-button" name="${showTitle}" id="see-role" >${r.name}</a><br/>
        ` })

      let actsDisplay = document.createElement('DIV')

      actsDisplay.innerHTML = `
      <br/><div class="row">
          <div class="col-sm-6" id="actI-scenes">
            <h3>Act I</h3>
          </div>
          <div class="col-sm-6" id="actII-scenes">
            <h3>Act I</h3>
          </div>
      </div>
      `
      while (showEl.firstChild) {
        showEl.removeChild(showEl.firstChild);
      }

      showEl.append(rolesDisplay, actsDisplay)
      transitionPage(header, showEl)


      show.actIScenes().forEach((s) =>{
        document.getElementById('actI-scenes').innerHTML += `
          <br/><a href="#" class="col-sm-4 w3-bar-item w3-button" id="see-scene" >Scene ${s.number}</a><br/>
      ` })

      show.actIIScenes().forEach((s) =>{
        document.getElementById('actII-scenes').innerHTML += `
          <br/><a href="#" class="col-sm-4 w3-bar-item w3-button" id="see-scene" >Scene ${s.number}</a><br/>
      ` })

    }

//ROLE PAGE
    if(e.target.id === 'see-role'){
      let showEl = document.getElementById('show-display')
      let show = Show.findShowByName(e.target.name)[0]
      let role = Role.all.filter((r)=>{return r.name === e.target.innerHTML})[0]
      let roleDis = document.createElement('DIV')
      roleDis.innerHTML = `

      <h4 id="show-title" class="jumbotron">${show.title}</h4><br/>
        <div class="row">
          <div class="col-lg-12 card-border w3-blue">
          <h2 id="role-name">${role.name}</h2><br/>
          </div>
        </div>
        <div class="container" >
          <div class="row" id="role-note-diplay">
          <div class="col-lg-6" id="scenes-side">
          <h3>Add Scenes:</h3><br/>
            <div class="dropdown">
              <button class="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown">Act I</button>
                <div class="dropdown-content" id="act-I-scenes">
                </div>
            </div>
          <div class="dropdown">
            <button class="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown">Act II</button>
            <div class="dropdown-content" id="act-II-scenes">
            </div>
          </div>
        </div>
        </div>
        </div>
        <br/><br/>

      `
      while (showEl.firstChild) {
        showEl.removeChild(showEl.firstChild);
      }

      showEl.append(roleDis)

      let actIdrop = document.getElementById('act-I-scenes')
      show.actIScenes().forEach((s)=>{
        actIdrop.innerHTML += `<a id="role-scene" name="${s.showId}" href="#">${s.number}</a>`
      })

      let actIIdrop = document.getElementById('act-II-scenes')
      show.actIIScenes().forEach((s)=>{
        actIIdrop.innerHTML += `<a id="role-scene" name="${role.name}" href="#">${s.number}</a>`
      })

      let notes = role.notes()

      if (notes.length){
        document.getElementById('scenes-side').innerHTML += `
        <div class"col-lg-6">
          <br/><br/><h2 id="scene-list">Scene List</h2>
          <div class="text-center " id="role-scenes-act-I"></div>
          <div class="text-center " id="role-scenes-act-II"></div>
        </div>
        </div>
        </div><br/><br/>`

        let roleScenesI = document.getElementById('role-scenes-act-I')
        let roleScenesII = document.getElementById('role-scenes-act-II')

        notes.forEach((n)=>{
          if (n.act === 1){
            let sceneNode = document.createElement('DIV')
            sceneNode.innerHTML += `<a id="role-scene-link-1" name="${n.id}" href="#">Act I, Scene ${n.scene().number}</a>`
            roleScenesI.append(sceneNode)
          } else {
            let sceneNode = document.createElement('DIV')
            sceneNode.innerHTML = `<br/><a id="role-scene-link-2" name="${n.id}" href="#">Act II, Scene ${n.scene().number}</a>`
            roleScenesII.appendChild(sceneNode)
          }
        })
      } else {
        document.getElementById('scenes-side').innerHTML += `
        <div class"center col-lg-6">
          <br/><br/><h2>Scene List</h2>
          <h5 id="scene-filler">Add a scene from above to this character's scene list!</h5>
          <div class="text-center" id="role-scenes-act-I"></div>
          <div class="text-center" id="role-scenes-act-II"></div>
          <br/>
        </div>
        `

      }
    }

//ADD SCENE TO ROLE
    if (e.target.id === 'role-scene'){
      let act = 0
      let roleName = document.getElementById('role-name').innerHTML
      let role = Role.all.filter((r)=>{return r.name === roleName})[0]
      let sceneNum = parseInt(e.target.innerHTML)
      let show = Show.findShowByName(document.getElementById('show-title').innerHTML)[0]
      if (e.target.parentElement.parentElement.children[0].innerHTML === "Act I"){
          act = 1
        } else {
          act = 2
        }
      let notes = role.notes()

      if (notes.length === 0) { document.getElementById('scene-filler').remove()}

      let scenes = Scene.all.filter((s)=>{
        return s.showId === show.id
      }).filter((s)=> {return s.act === act})
      let scene = scenes.filter((s)=>{ return s.number === sceneNum})[0]
      let body = ""
      NoteAdapter.create(scene, role, body)

      let roleScenesI = document.getElementById('role-scenes-act-I')
      let roleScenesII = document.getElementById('role-scenes-act-II')

      let listActI = Array.from(document.getElementById('role-scenes-act-II').children).map((c)=>{
        return Array.from(c.children)
      })
      let actIList = [].concat.apply([], listActI).map((c) =>{ return c.innerHTML})



      if (act === 1){
        let sceneNode = document.createElement('DIV')
        sceneNode.innerHTML += `<a id="role-scene-link-1" href="#">Act I, Scene ${scene.number}</a>`
        roleScenesI.append(sceneNode)
      } else {
        let sceneNode = document.createElement('DIV')
        sceneNode.innerHTML = `<br/><a id="role-scene-link-2" href="#">Act II, Scene ${scene.number}</a>`
        roleScenesII.appendChild(sceneNode)
      }

    }

//SCENE-N DISPLAY

    if (e.target.id === 'role-scene-link-1'){
      let showEl = document.getElementById('role-note-diplay')
      let show = Role.findRoleByName(document.getElementById('show-title').innerHTML)
      let roleName = document.getElementById('role-name').innerHTML
      let role = Role.findRoleByName(roleName)[0]

      let sceneNumber = parseInt(e.target.innerHTML.split(" ")[3])
      let scene = show.actIScenes().filter((s)=>{
        return s.number === sceneNumber
      })
      let note = Note.all.filter((n)=>{

      })

      showEl.innerHTML += `
      <div class"col-lg-6">
      <h1>${e.target.innerHTML}</h1>
      <form id="edit-note" class="" action="#" method="post">
        <label for="note-body">Scene Note:</label>
        <textarea class="form-control" rows="4" id="note-body"></textarea>
        <button type="button" class="btn btn-info" id="submit-note">Submit Note</button><br /><br />

      </form>
      </div>`
    }

    if (e.target.id === 'role-scene-link-2'){
      let showEl = document.getElementById('role-note-diplay')
      let showName = document.getElementById('show-title').innerHTML
      let show = Show.findShowByName(showName)[0]

      let roleName = document.getElementById('role-name').innerHTML
      let role = Role.findRoleByName(roleName)[0]

      let sceneNumber = parseInt(e.target.innerHTML.split(" ")[3])
      let scene = show.actIIScenes().filter((s)=>{
        return s.number === sceneNumber
      })[0]
      let notes = role.notes().filter((n)=>{
        return n.sceneId === scene.id
      })
      let note = notes.filter((n)=>{ return n.sceneId === scene.id})[0]


      showEl.innerHTML += `
      <div class"col-lg-6">
      <h1>${e.target.innerHTML}</h1>
      <form id="edit-note" class="col-lg-6" action="#" method="post">
        <label for="note-body">Scene Note:</label>
        <textarea class="form-control" rows="4" id="note-body" ></textarea>
        <button type="button" class="btn btn-info" name="" id="submit-note">Submit Note</button><br /><br />
      </form>
      </div>`
    }

//UPDATE NO

      if (e.target.id === 'submit-note'){
        debugger
      }

  })//Event Listener

})//DOM listener


//###############################################################################
//Show Form Pieces

function createScenes(num, act, showTitle){
  let i = 1
  while (i <= num) {
    let newScene = SceneAdapter.create(i, act, showTitle)
    i++
  }
}
//###############################################################################


 //###############################################################################
 function fadeOut(el) {
  el.classList.add("fade-up-out")
  setTimeout(() => {
    el.style.opacity = 0
    el.remove("fade-up-out")
    el.style.pointerEvents = "none"
  }, FADEDURATION)
}

function fadeIn(el) {
  el.classList.add("fade-down-in")
  setTimeout(() => {
    el.style.opacity = 1
    el.classList.remove("fade-down-in")
    el.style.pointerEvents = "auto"
  }, FADEDURATION)
}

function transitionPage(groupOut, groupIn) {
  fadeOut(groupOut)
  setTimeout(() => {
    fadeIn(groupIn)
  }, LONGESTPOSSIBLE)
}

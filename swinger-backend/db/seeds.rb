# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


show1 = Show.create(name: "Gypsy")
show2 = Show.create(name: "A Chorus Line")

role1 = Role.create(name: "Mamma Rose", show_id: 1)
role2 = Role.create(name: "Maggie", show_id: 2)
role3 = Role.create(name: "Bebe", show_id: 2)

scene1 = Scene.create(number: 1, act: 1, show_id: 1)
scene2 = Scene.create(number: 2, act: 1, show_id: 1)
scene3 = Scene.create(number: 3, act: 1, show_id: 1)
scene4 = Scene.create(number: 4, act: 1, show_id: 1)
scene5 = Scene.create(number: 5, act: 1, show_id: 1)
scene6 = Scene.create(number: 1, act: 2, show_id: 1)
scene7 = Scene.create(number: 2, act: 2, show_id: 1)
scene8 = Scene.create(number: 3, act: 2, show_id: 1)
scene9 = Scene.create(number: 4, act: 2, show_id: 1)
scene10 = Scene.create(number: 5, act: 2, show_id: 1)
scene11 = Scene.create(number: 1, act: 1, show_id: 2)
scene12 = Scene.create(number: 2, act: 1, show_id: 2)
scene13 = Scene.create(number: 3, act: 1, show_id: 2)
scene14 = Scene.create(number: 4, act: 1, show_id: 2)
scene15 = Scene.create(number: 5, act: 1, show_id: 2)
scene16 = Scene.create(number: 1, act: 2, show_id: 2)
scene17 = Scene.create(number: 2, act: 2, show_id: 2)
scene18 = Scene.create(number: 3, act: 2, show_id: 2)
scene19 = Scene.create(number: 4, act: 2, show_id: 2)
scene20 = Scene.create(number: 5, act: 2, show_id: 2)


note1 = Note.create(role_id: 1, scene_id: 1, body: "Do it well!")

class Show < ApplicationRecord
  has_many :roles
  has_many :scenes

  validates :title, :user_id, presence: true

  def act_I_scenes
    scenes = Scene.all.select do |s|
      s.show_id === self.id
    end

    return scenes.select do |s|
      s.act == 1
    end
  end

  def act_II_Scenes
    scenes = Scene.all.select do |s|
      s.show_id === self.id
    end

    return scenes.select do |s|
      s.act == 2
    end
  end

  def roles
    Role.all.select do |r|
      r.show_id === self.id
    end
  end

  def scene_roles
    arr = []
    arr.push({roles: self.roles, scenes: {actI: self.act_I_scenes, actII: self.act_II_Scenes}})
    arr
  end

end

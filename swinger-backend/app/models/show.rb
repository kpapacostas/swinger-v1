class Show < ApplicationRecord
  has_many :roles
  has_many :scenes

  validates :name, presence: true

  def scenes
    Scene.all.select do |s|
      s.show_id === self.id
    end
  end

  def roles
    Role.all.select do |r|
      r.show_id === self.id
    end
  end

  def scene_roles
    arr = []
    arr.push({roles: self.roles, scenes: self.scenes})
    arr
  end

end

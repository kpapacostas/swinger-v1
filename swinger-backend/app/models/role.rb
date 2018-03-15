class Role < ApplicationRecord
  belongs_to :show
  has_many :notes
  has_many :scenes, through: :notes

  validates :name, :show_id, presence: true


  def slides
    Slide.all.select do |s|
      s.role_id === self.id
    end
  end

  def scenes
    slide_scenes = self.slides.map do |s|
      scene = Scene.find(s.scene_id)
      slides = Slide.all.select{ |slide| slide.scene_id === scene.id}
      scene_slides = {"act" => scene.act, "number" => scene.number, "slides" => slides, "id" => scene.id }
    end
    slide_scenes.uniq{|sc| sc["id"]}
  end
end

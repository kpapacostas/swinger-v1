class Slide < ApplicationRecord
  belongs_to :scene
  belongs_to :role
  has_many :notes

  validates :scene_id, :role_id, presence: true

end

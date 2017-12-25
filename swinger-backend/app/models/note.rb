class Note < ApplicationRecord
  belongs_to :scene
  belongs_to :role

  validates :scene_id, :role_id, presence: true
end

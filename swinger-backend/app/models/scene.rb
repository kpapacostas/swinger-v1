class Scene < ApplicationRecord
  belongs_to :show
  has_many :notes
  has_many :roles, through: :notes
  has_many :slides


end

class Show < ApplicationRecord
  has_many :roles
  has_many :scenes

  validates :name, presence: true
end

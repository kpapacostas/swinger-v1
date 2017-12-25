class Role < ApplicationRecord
  belongs_to :show
  has_many :notes
  has_many :scenes, through: :notes

  validates :name, :show_id, presence: true
end

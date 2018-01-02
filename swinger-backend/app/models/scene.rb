class Scene < ApplicationRecord
  belongs_to :show
  has_many :notes
  has_many :roles, through: :notes

  validates :number, :show_id, :act, presence: true

end

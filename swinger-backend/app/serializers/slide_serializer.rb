class SlideSerializer < ActiveModel::Serializer
  attributes :id, :number, :scene_id, :coordinates
  has_many :notes
end

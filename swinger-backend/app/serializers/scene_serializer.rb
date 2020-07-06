class SceneSerializer < ActiveModel::Serializer
  attributes :id, :act, :number
  has_many :slides
end

class ShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :scene_roles
  has_many :scenes

end

class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :shows

  def token(user_id)
    issue_token(user_id)
  end

  def issue_token(payload)
    JWT.encode(payload, 'secret', 'HS256')
  end

end

class User < ApplicationRecord
  validates :username, :password, presence: true

  def shows
    Show.all.select do |s|
      s.user_id == self.id
    end
  end

end

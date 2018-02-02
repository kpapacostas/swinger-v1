class Api::V1::AuthController < ApplicationController

  def create
    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      render json: {
        jwt: JWT.encode({user_id: user.id}, ENV['pusher_key'], 'HS256'),
        user: {
          id: user.id,
          username: user.username,
          shows: user.shows,
        }
      }
    else
      render json: {error: 'User not found'}, status: 404
    end
  end

  def show
    if current_user
      render json: {
        id: current_user.id,
        username: current_user.username,
        shows: current_user.shows,
      }
    else
      render json: {error: 'No id present on headers'}, status: 404
    end

  end

end

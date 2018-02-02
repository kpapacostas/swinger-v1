class Api::V1::UsersController < ApplicationController

  def index
    users = User.all
    render json: users, status: 200
  end

  def create
    new_user = User.new(user_params)

    if new_user.valid?
      new_user.save
      render json: new_user, status: 201
    else
      render json: {message:"A User needs a name!"}
    end
  end

  def update
    @user.update(params)
    render json: @user, status: 200
  end

  def destroy
    userId = @user.id
    @user.destroy
    render json: {message:"Zap! User deleted", userId: userId}
  end

  def show
    user = User.find(params[:id])
    if user
      render json: UserSerializer.new(user)
    else
      render ({ json: {erro: 'User not found'}, status: 401})
    end
  end



  private
  def user_params
    params.permit(:username, :password)
  end

  def set_user
    @user = User.find(params[:id])
  end

end

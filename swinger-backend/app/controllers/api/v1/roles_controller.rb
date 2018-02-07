class Api::V1::RolesController < ApplicationController
    def index
    roles = Role.all
    render json: roles, status: 200
  end

  def create
    role = Role.new(name: params[:name], show_id: params[:showId])

    if role.valid?
      role.save
      render json: role, status: 201
    else
      render json: {message:"Each Role needs a name!"}
    end
  end

  def update
    @role = Role.find_by(name: params[:name])
    show = Show.find(@role.show_id)
    @role.update(name: params[:change])
    render json: ShowSerializer.new(show), status: 200
  end

  def destroy
    @role = Role.find(params[:id])
    @role.destroy
    render json: {message:"Zap! Role deleted", roleId:roleId}
  end

  def show
    render json: @role, status: 200
  end

  private
  def role_params
    params.permit(:title, :content)
  end

  def set_role
    @role = Role.find(params[:id])
  end

end

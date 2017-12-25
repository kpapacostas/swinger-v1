class Api::V1::RolesController < ApplicationController
    def index
    roles = Role.all
    render json: roles, status: 200
  end

  def create
    role = Role.new(title: params[:title], body: params[:content])

    if role.valid?
      role.save
      render json: role, status: 201
    else
      render json: {message:"A Role needs both a Title & Content"}
    end
  end

  def update
    @role.update(title: params[:title], body: params[:content])
    render json: @role, status: 200
  end

  def destroy
    roleId = @role.id
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

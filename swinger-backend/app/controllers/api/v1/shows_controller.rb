class Api::V1::ShowsController < ApplicationController

  def index
    @shows = Show.all
    render json: @shows
  end

  def create
    show = Show.new(title: params[:title], user_id: params[:userId])

    if show.valid?
      show.save
      render json: show, status: 201
    else
      render json: {message:"A Show needs a title!"}
    end
  end

  def update
    @show = Show.find(params[:id])
    user = User.find(@show.user_id)
    @show.update(title: params[:title])
    render json: UserSerializer.new(user), status: 200
  end

  def destroy
    @show = Show.find(params[:id])
    user = User.find(@show.user_id)
    @show.act_I_scenes.each{|s| s.destroy}
    @show.act_II_Scenes.each{|s| s.destroy}
    @show.roles.each{|r| r.destroy}
    @show.destroy
    render json: UserSerializer.new(user), status: 200
  end

  def show
    show = Show.find_by(title: params[:id])
    render json: ShowSerializer.new(show)
  end




end

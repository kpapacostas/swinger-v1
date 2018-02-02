class Api::V1::ShowsController < ApplicationController

  def index
    @shows = Show.all
    render json: @shows
  end

  def create
    show = Show.new(name: params[:title])

    if show.valid?
      show.save
      render json: show, status: 201
    else
      render json: {message:"A Show needs a name!"}
    end
  end

  def update
    # @show.update(title: params[:title], body: params[:content])
    # render json: @show, status: 200
  end

  def destroy
    showId = Show.find(params[:id]).id
    @show.destroy
    render json: {message:"Zap! Show deleted", showId:showId}
  end

  def show
    show = Show.find_by(name: params[:id])
    render json: ShowSerializer.new(show)
  end

  private
  def show_params
    params.permit(:name)
  end



end

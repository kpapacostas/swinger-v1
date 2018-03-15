class Api::V1::SlidesController < ApplicationController

  def index
    slides = Slide.all
    render json: slides, status: 200
  end

  def create
    slide = Slide.new(role_id: params[:roleId], scene_id: params[:sceneId], number: params[:number], coordinates: params[:coordinates])

    if slide.valid?
      slide.save
      render json: slide, status: 201
    else
      render json: {message:"A Slide needs content!"}
    end
  end

  def update
    role = Role.find(params[:role_id])
    slide = Slide.find(params[:id])
    slide.update(coordinates: params[:coordinates])
    render json: RoleSerializer.new(role), status: 200
  end

  def destroy
    slide = Slide.find(params[:id])
    slide.destroy
    render json: {message:"Zap! Slide deleted", noteId:noteId}
  end

  def show
    byebug
    slide = Slide.find(params[:id])
    render json: slide, status: 200
  end

  # private
  # def note_params
  #   params.permit(:title, :content)
  # end
  #
  # def set_note
  #   slide = Slide.find(params[:id])
  # end

end

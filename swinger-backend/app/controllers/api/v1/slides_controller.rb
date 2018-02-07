class Api::V1::SlidesController < ApplicationController
  def index
    notes = Note.all
    render json: notes, status: 200
  end

  def create
    slide = Slide.new(role_id: params[:roleId], scene_id: params[:sceneId], body: params[:body])

    if slide.valid?
      slide.save
      render json: slide, status: 201
    else
      render json: {message:"A Slide needs content!"}
    end
  end

  def update
    @note.update(title: params[:title], body: params[:content])
    render json: @note, status: 200
  end

  def destroy
    noteId = @note.id
    @note.destroy
    render json: {message:"Zap! Note deleted", noteId:noteId}
  end

  def show
    render json: @note, status: 200
  end

  private
  def note_params
    params.permit(:title, :content)
  end

  def set_note
    @note = Note.find(params[:id])
  end

end

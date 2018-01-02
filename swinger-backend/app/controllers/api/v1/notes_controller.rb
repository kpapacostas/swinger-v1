class Api::V1::NotesController < ApplicationController
  def index
    notes = Note.all
    render json: notes, status: 200
  end

  def create
    note = Note.new(role_id: params[:role_id], scene_id: params[:scene_id], body: params[:body])

    if note.valid?
      note.save
      render json: note, status: 201
    else
      render json: {message:"A Note needs both a Title & Content"}
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

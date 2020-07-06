class Api::V1::NotesController < ApplicationController
  def index
    byebug
    notes = Note.all.filter{ |n| n.slide_id == params[:slideId]}
    render json: notes, status: 200
  end

  def create
    note = Note.new(slide_id: params[:slideId], body: params[:body])

    if note.valid?
      note.save
      render json: note, status: 201
    else
      render json: {message:"Each Note needs a name!"}
    end
  end

  def update
    note = Note.find_by(params[:id])
    note.update
    render json: note, status: 200
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy
    render json: {message:"Note gone!"}
  end

  def show
    scene = Scene.find(params[:id])
    slides = scene.slides
    slide_notes = []
    slides.each{|sl| slide_notes.push(sl.notes) }
    render json: slide_notes, status: 200
  end

  private
  def role_params
    params.permit(:title, :content)
  end

  def set_role
    @note = Note.find(params[:id])
  end

end

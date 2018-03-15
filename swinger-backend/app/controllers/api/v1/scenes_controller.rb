class Api::V1::ScenesController < ApplicationController
    def index
    scenes = Scene.all
    render json: scenes, status: 200
  end

  def create
    scene = Scene.new(number: params[:number], act: params[:act], show_id: params[:show])

    if scene.valid?
      scene.save
      render json: scene, status: 201
    else
      render json: {message:"A Scene needs both a Title & Content"}
    end
  end

  def update
    @scene.update(title: params[:title], body: params[:content])
    render json: @scene, status: 200
  end

  def destroy
    sceneId = @scene.id
    @scene.destroy
    render json: {message:"Zap! Scene deleted", sceneId:sceneId}
  end

  def show
    scene = Scene.find(params[:id])
    render json: SceneSerializer.new(scene), status: 200
  end

  private
  def scene_params
    params.permit(:title, :content)
  end

  def set_scene
    @scene = Scene.find(params[:id])
  end

end

class CreateNewColumnOnSlides < ActiveRecord::Migration[5.1]
  def change
    add_column :slides, :coordinates, :json 
  end
end

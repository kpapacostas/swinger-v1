class DeleteColumnFromSlides < ActiveRecord::Migration[5.1]
  def change
    remove_column :slides, :body, :string
  end
end

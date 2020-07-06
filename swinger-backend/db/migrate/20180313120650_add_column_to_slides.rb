class AddColumnToSlides < ActiveRecord::Migration[5.1]
  def change
    add_column :slides, :number, :string
  end
end

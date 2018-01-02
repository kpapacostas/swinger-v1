class AddColumnToScenes < ActiveRecord::Migration[5.1]
  def change
    add_column :scenes, :act, :integer
  end
end

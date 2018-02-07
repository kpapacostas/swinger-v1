class ChangeColumnNameOnShows < ActiveRecord::Migration[5.1]
  def change
    rename_column :shows, :name, :title
  end
end

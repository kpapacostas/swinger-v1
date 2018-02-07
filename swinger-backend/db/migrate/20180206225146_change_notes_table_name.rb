class ChangeNotesTableName < ActiveRecord::Migration[5.1]
  def change
    rename_table :notes, :slides
  end
end

class CreateScenes < ActiveRecord::Migration[5.1]
  def change
    create_table :scenes do |t|
      t.integer :number
      t.integer :show_id

      t.timestamps
    end
  end
end

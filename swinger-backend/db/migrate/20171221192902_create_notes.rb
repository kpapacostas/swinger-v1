class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.string :body
      t.integer :role_id
      t.integer :scene_id

      t.timestamps
    end
  end
end

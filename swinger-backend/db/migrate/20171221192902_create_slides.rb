class CreateSlides < ActiveRecord::Migration[5.1]
  def change
    create_table :slides do |t|
      t.integer :role_id
      t.integer :scene_id

      t.timestamps
    end
  end
end

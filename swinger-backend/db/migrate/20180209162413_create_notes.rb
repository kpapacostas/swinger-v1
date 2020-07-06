class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.string :title
      t.string :body
      t.string :slide_id

      t.timestamps
    end
  end
end

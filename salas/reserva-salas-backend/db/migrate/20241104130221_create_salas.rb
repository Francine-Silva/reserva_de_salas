class CreateSalas < ActiveRecord::Migration[7.2]
  def change
    create_table :salas do |t|
      t.string :nome

      t.timestamps
    end
  end
end

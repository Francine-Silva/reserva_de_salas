class CreateReservas < ActiveRecord::Migration[7.2]
  def change
    create_table :reservas do |t|
      t.date :data
      t.time :hora
      t.references :usuario, null: false, foreign_key: true

      t.timestamps
    end
  end
end

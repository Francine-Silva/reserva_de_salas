class AddSalaToReservas < ActiveRecord::Migration[7.2]
  def change
    add_reference :reservas, :sala, null: false, foreign_key: true
  end
end

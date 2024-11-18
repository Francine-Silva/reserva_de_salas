class ChangeHoraToBeStringInReservas < ActiveRecord::Migration[7.2]
  def change
    change_column :reservas, :hora, :string
  end
end

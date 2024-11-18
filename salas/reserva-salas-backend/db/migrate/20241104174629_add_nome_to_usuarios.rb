class AddNomeToUsuarios < ActiveRecord::Migration[7.2]
  def change
    add_column :usuarios, :nome, :string
  end
end

class Usuario < ApplicationRecord
  has_secure_password

  has_many :reservas
  validates :email, presence: true, uniqueness: true
  validates :nome, presence: true
end

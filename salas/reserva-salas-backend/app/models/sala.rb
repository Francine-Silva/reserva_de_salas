class Sala < ApplicationRecord
  has_many :reservas

  validates :nome, presence: true, uniqueness: true
end

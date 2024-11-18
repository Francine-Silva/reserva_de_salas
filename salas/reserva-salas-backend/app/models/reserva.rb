class Reserva < ApplicationRecord
  belongs_to :usuario
  belongs_to :sala

  validates :data, presence: true
  validates :hora, presence: true
end

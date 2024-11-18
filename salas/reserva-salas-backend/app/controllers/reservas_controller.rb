class ReservasController < ApplicationController
  before_action :logado?, only: [ :new, :create, :index ]

  def index
    @usuario_logado = usuario_logado
    @reservas = Reserva.where(usuario_id: @usuario_logado.id)

    render json: @reservas
  end

  def show
    render json: @reserva
  end

  def new
    @reserva = Reserva.new(reserva_params)

    render json: @reserva
  end

  def create
    @reserva = Reserva.new(reserva_params)
    @reserva.usuario_id = @usuario_logado.id

    if @reserva.save
      render json: @reserva, status: :created, location: @reserva
    else
      render json: @reserva.errors, status: :unprocessable_entity
    end
  end

  def update
    if @reserva.update(reserva_params)
      render json: @reserva
    else
      render json: @reserva.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @reserva.destroy
  end

  def horas_predefinidas
    hora_selecionada = params[:hora_selecionada]
    hora_inicio = "08:00"
    hora_fim = "23:00"
    hora_agora = Time.now.strftime("%H:%M")

    hora_inicio_time = Time.parse(hora_inicio)
    hora_fim_time = Time.parse(hora_fim)
    hora_agora_time = Time.parse(hora_agora)

    hora_slots = []

    while hora_inicio_time < hora_fim_time
      proxima_hora_time = hora_inicio_time + 1.hour
      hora_slots << "#{hora_inicio_time.strftime('%H:%M')}h-#{proxima_hora_time.strftime('%H:%M')}h" if hora_inicio_time >= hora_agora_time
      hora_inicio_time = proxima_hora_time
    end

    reservas = Reserva.where(data: params[:data])
    if !reservas.nil?
      reservas.each { |reserva| hora_slots.delete(hora_selecionada) if hora_selecionada == reserva.hora }
    end

    render json: { slots: hora_slots }, status: :ok
  end

  private

    def reserva_params
      params.require(:reserva).permit(:sala_id, :data, :hora)
    end
end

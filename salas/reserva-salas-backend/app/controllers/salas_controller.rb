class SalasController < ApplicationController
  def index
    @salas = Sala.all

    render json: @salas
  end

  def show
    render json: @sala
  end

  def new
    @sala = Sala.new

    render json: @sala
  end

  def create
    @sala = Sala.new(sala_params)

    if @sala.save
      render json: @sala, status: :created, location: @sala
    else
      render json: @sala.errors, status: :unprocessable_entity
    end
  end

  def update
    if @sala.update(sala_params)
      render json: @sala
    else
      render json: @sala.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @sala.destroy
  end

  private

    def sala_params
      params.require(:sala).permit(:nome)
    end
end

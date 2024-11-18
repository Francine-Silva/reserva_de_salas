class UsuariosController < ApplicationController
  def new
    @usuario = Usuario.new
  end

  def show
    @usuario = Usuario.find(params[:id])
    render json: @usuario
  end

  def create
    @usuario = Usuario.new(usuario_params)

    if @usuario.save
      render json: @usuario, status: :created, location: @usuario

    else
      render json: @usuario.errors, status: :unprocessable_entity
    end
  end

  def usuario_params
    params.require(:usuario).permit(:nome, :email, :password)
  end
end

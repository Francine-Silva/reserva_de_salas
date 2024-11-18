class UsuarioSessionsController < ApplicationController
  def new
    @usuario = Usuario.new
  end

  def create
    @usuario = Usuario.find_by(email: params[:usuario][:email])

    if @usuario && @usuario.authenticate(params[:usuario][:password])
      session[:usuario_id] = @usuario.id

      render json: { message: "Login realizado com sucesso", usuario: @usuario }, status: :ok
    else
      render json: { message: "Email ou senha invalidos" }, status: :unauthorized
    end
  end

  def destroy
    session[:usuario_id] = nil
    render json: { message: "Logout realizado com sucesso" }, status: :ok
  end
end

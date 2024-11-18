class ApplicationController < ActionController::API
  def usuario_logado
    @usuario_logado ||= Usuario.find_by(id: session[:usuario_id]) if session[:usuario_id]
  end

  def logado?
    unless usuario_logado.present?
      render json: { message: "Você precisa estar logado para acessar este recurso." }, status: :unauthorized
    end
  end
end

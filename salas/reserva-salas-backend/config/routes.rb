Rails.application.routes.draw do
  resources :salas
  resources :reservas do
    collection do
      get :horas_predefinidas
    end
  end
  resources :usuarios, only: [ :new, :create, :show ]
  resources :usuario_sessions, only: [ :new, :create, :destroy ]
end

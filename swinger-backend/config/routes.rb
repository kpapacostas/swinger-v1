Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :shows
      resources :roles
      resources :scenes
      resources :notes
      resources :users
    end
  end

end

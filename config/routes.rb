Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
  
  # 造園会社のページ
  get "about", to: "home#about"
  get "contact", to: "home#contact"
end

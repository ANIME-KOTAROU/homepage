class Contact < ApplicationRecord
  validates :name, presence: true, length: { maximum: 100 }
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone, length: { maximum: 20 }, allow_blank: true
  validates :subject, presence: true, length: { maximum: 200 }
  validates :message, presence: true, length: { maximum: 2000 }
end

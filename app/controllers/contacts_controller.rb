class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end
  
  def create
    @contact = Contact.new(contact_params)
    
    if @contact.save
      # メール送信処理（後で実装）
      redirect_to contact_thanks_path, notice: "お問い合わせありがとうございます。"
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def thanks
    # サンクスページ
  end
  
  private
  
  def contact_params
    params.require(:contact).permit(:name, :email, :phone, :subject, :message)
  end
end

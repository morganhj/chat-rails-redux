class MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.save
  end

  def destroy
    @message = Message.find(params[:id])
    @message.destroy
  end

  private

  def message_params
    params.require(:message).permit(:user_id, :channel_id, :content)
  end
end

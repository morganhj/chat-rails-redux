class Api::V1::MessagesController < ApplicationController
  before_action :fetch_channel


  def index
    messages = @channel.messages
    render json: messages
  end

  def create
    message = Message.new(channel: @channel, content: params[:content])
    message.user = current_user
    message.save
    render json: message
  end

  private

  def fetch_channel
    @channel = Channel.find_by(name: params[:channel_id])
  end
end

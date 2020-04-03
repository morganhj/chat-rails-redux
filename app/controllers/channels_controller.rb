class ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)
  end

  def show
    if params[:id].blank?
      redirect_to channel_path(Channel.first.name)
    else
      @channel = Channel.find_by(name: params[:id])
      @channels = Channel.all
    end
  end

  def index
    @channels = Channel.all
  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.destroy
  end

  private

  def channel_params
    params.require(:channel).permit(:name)
  end
end

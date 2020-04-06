class ChannelsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @channel = Channel.find_by(name: params[:channel_id])
    stream_from @channel
  end

  def recieved(data)
    ChannelsChannel.broadcast_to(@channel, {messages: @channel.messages})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

import consumer from "./consumer"
import { appendMessage } from "../chat/actions"

function subscribeActionCable(props) {
  consumer.subscriptions.create({ channel: 'ChannelsChannel', name: props.selectedChannel }, {
    received(message) {
      if (message.channel === props.selectedChannel) {
        props.appendMessage(message);
      }
    },
  })
}

export default subscribeActionCable;

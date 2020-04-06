import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchMessages, appendMessage } from '../actions';
import Message from '../components/message';
import MessageForm from '../containers/message_form';


class MessageList extends Component {

  fetchMessages = () => {
    this.props.fetchMessages(this.props.selectedChannel);
  }

  appendMessage = (message) => {
    this.props.appendMessage(message);
  }

  subscribeActionCable(props) {
    props.fetchMessages(props.selectedChannel)

    props.CableApp.cable.channel =
    props.CableApp.cable.subscriptions.create({ channel: 'ChannelsChannel', room: `channel_${props.selectedChannel}` },
    {
      received(message) {
        if (message.channel === props.selectedChannel) {
          this.appendMessage(message);
        }
      }
    })
  }

  componentWillMount() {
    this.fetchMessages();
  }

  componentDidMount() {
    this.subscribeActionCable(this.props);
  }

  componentWillReceiveProps(nextProps) { // For after switching channels
    if (this.props.selectedChannel != nextProps.selectedChannel) {
      this.subscribeActionCable(nextProps);
    }
  }

  componentDidUpdate() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  render () {
    return (
      <div className="channel-container">
        <div className="channel-title">
          <span>Channel #{this.props.selectedChannel}</span>
        </div>
        <div className="channel-content" ref={(list) => { this.list = list; }}>
          {
            this.props.messages.map((message) => {
              return <Message key={message.id} {...message} />;
            })
          }
        </div>
        <MessageForm selectedChannel={this.props.selectedChannel} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMessages, appendMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);

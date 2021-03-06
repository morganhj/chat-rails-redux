import React from 'react';
import ChannelList from '../containers/channel_list';
import MessageList from '../containers/message_list';


const App = (props) => {
  return (
    <div className="messaging-wrapper">
      <div className="logo-container">
        <img className="messaging-logo" src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/logo.png" alt="logo" />
      </div>
      <ChannelList selectedChannel={props.match.params.channel} />
      <MessageList
      selectedChannel={props.match.params.channel}
      CableApp={props.CableApp} />
    </div>
  );
};

export default App;

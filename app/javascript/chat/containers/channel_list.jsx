/* eslint no-bitwise:off */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectChannel, fetchMessages } from '../actions/index';
import { Link } from 'react-router-dom';

class ChannelList extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.channel !== this.props.channel) {
      this.props.fetchMessages(nextProps.channel);
    }
  }

  renderChannel = (channel) => {
    const src = `/channels/${channel}`;
    return (
      <li key={channel}
        className={channel === this.props.channel ? 'active' : null}
        role="presentation">
        <Link to={src}>
        #{channel}
        </Link>
      </li>
    );
  }

  render() {
    return (
      <div className="channels-container">
        <span>Redux Chat</span>
        <ul>
          {this.props.channels.map(this.renderChannel)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // const idFromUrl = parseInt(ownProps.match.params.id, 10); // From URL
  const channel = state.channels.find(p => p === ownProps.selectedChannel);
  return { channel, channels: state.channels };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);

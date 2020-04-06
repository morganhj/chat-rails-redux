export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const MESSAGE_POSTED = 'MESSAGE_POSTED';
export const APPEND_MESSAGE = 'APPEND_MESSAGE';
export const CHANNEL_SELECTED = 'CHANNEL_SELECTED';

export function fetchMessages(channel) {
  const url = `/api/v1/channels/${channel}/messages`;
  const promise = fetch(url, { credentials: "same-origin" }).then(r => r.json());

  return {
    type: FETCH_MESSAGES,
    payload: promise // Will be resolved by redux-promise
  };
}

export function createMessage(channel, content) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  const url = `/api/v1/channels/${channel}/messages`;
  const body = { channel, content }; // ES6 destructuring
  const promise = fetch(url, {
    method: 'POST',
    headers: {
      'X-CSRF-Token': csrfToken,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: "same-origin",
    body: JSON.stringify(body)
  }).then(response => response.json());
  return {
    type: MESSAGE_POSTED,
    payload: promise // Will be resolved by redux-promise
  };
}

export function selectChannel(channel) {
  return {
    type: CHANNEL_SELECTED,
    payload: channel
  };
}

export function appendMessage(message) {
  debugger
  return {
    type: APPEND_MESSAGE,
    payload: message
  }
}

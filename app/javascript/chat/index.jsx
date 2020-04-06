// app/javascript/chat/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import * as serviceWorker from './serviceWorker';
import actionCable from 'actioncable'

import App from './components/app';
import messagesReducer from './reducers/messages_reducer';

const chatContainer = document.getElementById('chat_app');
const channels = JSON.parse(chatContainer.dataset.channels).map(c => c.name);
const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

const initialState = {
  messages: [],
  channels: channels // TODO: get that from Rails DB.
};

const reducers = combineReducers({
  messages: messagesReducer,
  channels: (state = null, action) => state
});

const middlewares = applyMiddleware(logger, ReduxPromise);
const store = createStore(reducers, initialState, middlewares);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
        path="/channels/:channel"
        render={(props) => <App {...props} CableApp={CableApp} isAuthed={true} />}
        />
      </Switch>
    </BrowserRouter>
  </Provider>,
  chatContainer
);

// serviceWorker.unregister();

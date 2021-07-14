import {combineReducers} from 'redux';
import * as Types from './constants';

const initialWindowState = {
  width: window.innerWidth,
  height: window.innerHeight
}
const windowState = (state = initialWindowState, action) => {
  switch (action.type) {
    case Types.SET_WINDOW:
      return action.value;
    default:
      return state;
  }
}
const initialColorState = {
  ButtonColor:"rgba(26, 131, 223, 0.47)",
  NavColor:"rgba(26, 131, 223, 0.47)",
  ClientChatColor:"rgba(131, 223, 26, 0.3)",
  IncomingChatColor:"rgba(26, 131, 223, 0.3)"
}
const Colors = (state = initialColorState, action) => {
  switch (action.type) {
    case Types.SET_COLORS:
      return action.value;
    default:
      return state;
  }
}

const SignalR = (state = false, action) => {
  switch (action.type) {
    case Types.SET_SIGNAL_R:
      return action.value;
    default:
      return state;
  }
}

const BaseURL = (state = "http://localhost", action) => {
  switch (action.type) {
    case Types.SET_BASE_API_URL:
      return action.value;
    default:
      return state;
  }
}

const DimBackground = (state = false, action) => {
  switch (action.type) {
    case Types.SET_DIM_BACKGROUND:
      return action.value;
    default:
      return state;
  }
}
const initialPopup = {
  active: false,
  content: null
}
const Popup = (state = initialPopup, action) => {
  switch (action.type) {
    case Types.SET_POP_UP:
      if (action.value?.active === undefined || action.value?.active === null) {
        const temp = action.value;
        temp.active = false;
        return temp;
      }
      return action.value;
    default:
      return state;
  }
}

const SavedRequests = (state = [], action) => {
  switch (action.type) {
    case Types.SET_SAVED_REQUESTS:
      return action.value;
    default:
      return state;
  }
}

const Messages = (state = [], action) => {
  switch (action.type) {
    case Types.ADD_MESSAGE:
      const temp = [...state]
      temp.push(action.value);
      return temp;
    case Types.SET_MESSAGES:
      return action.value;
    case Types.CLEAR_MESSAGES:
      return [];
    default:
      return state;
  }
}

const globalReducers = combineReducers({
  windowState,
  Messages,
  Colors,
  SignalR,
  BaseURL,
  DimBackground,
  Popup,
  SavedRequests
})

export default globalReducers;


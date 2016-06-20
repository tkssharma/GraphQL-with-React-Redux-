import { FETCH_YOUTUBE_WEATHER } from '../actions/index';

const initialState = {};

function youtube(state = initialState, action) {
  switch (action.type) {
  case FETCH_YOUTUBE_WEATHER:
    return Object.assign({}, state, {
      youtube: action.weather,
      weather: action.youtube
    });
  break;
  default:
    return state;
  }
}

export default youtube;

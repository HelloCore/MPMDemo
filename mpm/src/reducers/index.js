// @flow
import { combineReducers } from 'redux';
import CalendarReducer from './calendar';
import type { CalendarState } from './calendar';

export type AppState = {
  calendar: CalendarState
};

const makeRootReducer = () => {
  return combineReducers({
    calendar: CalendarReducer
  });
};

export default makeRootReducer;

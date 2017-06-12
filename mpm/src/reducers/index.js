// @flow
import { combineReducers } from 'redux';
import CalendarReducer from './calendar';

const makeRootReducer = () => {
  return combineReducers({
    calendar: CalendarReducer
  });
};

export default makeRootReducer;

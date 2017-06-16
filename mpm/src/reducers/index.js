// @flow
import { combineReducers } from 'redux';

import CalendarReducer from './calendar';
import type { CalendarState } from './calendar';

import TimesheetReducer from './timesheet';
import type { TimesheetState } from './timesheet';

import UserReducer from './user';
import type { UserState } from './user';

export type AppState = {
  calendar: CalendarState,
  timesheet: TimesheetState,
  user: UserState
};

const makeRootReducer = () => {
  return combineReducers({
    calendar: CalendarReducer,
    timesheet: TimesheetReducer,
    user: UserReducer
  });
};

export default makeRootReducer;

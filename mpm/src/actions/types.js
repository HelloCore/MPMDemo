// @flow

import type { CalendarAction } from './calendar';
import type { TimesheetAction } from './timesheet';
import type { UserAction } from './user';

export type Action =
  | CalendarAction
  | TimesheetAction
  | ThunkAction
  | PromiseAction
  | Array<CalendarAction>;

export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

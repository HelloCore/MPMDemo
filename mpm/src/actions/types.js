import type { CalendarAction } from './calendar';

export type Action =
  | CalendarAction
  | ThunkAction
  | PromiseAction
  | Array<CalendarAction>;

export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

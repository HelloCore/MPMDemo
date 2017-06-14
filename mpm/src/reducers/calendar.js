// @flow
import Moment from 'moment';
import { PREV_MONTH, NEXT_MONTH, CURRENT_MONTH } from '../actions/calendar';
import type { CalendarAction } from '../actions/calendar';

export type CalendarState = {
  today: Moment,
  month: Moment
};

const initialState: CalendarState = {
  today: Moment(),
  month: Moment().date(1).hours(0).minutes(0).seconds(0)
};

export default function calendarReducer(
  state: CalendarState = initialState,
  action: CalendarAction
) {
  switch (action.type) {
    case PREV_MONTH:
      return {
        ...state,
        month: state.month.clone().subtract(1, 'month')
      };

    case NEXT_MONTH:
      return {
        ...state,
        month: state.month.clone().add(1, 'month')
      };
    case CURRENT_MONTH:
      return {
        ...state,
        month: state.today.clone().date(1).hours(0).minutes(0).seconds(0)
      };
    default:
      break;
  }
  return state;
}

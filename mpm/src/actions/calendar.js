// @flow

export const PREV_MONTH: string = 'CALENDAR_PREV_MONTH';
export const NEXT_MONTH: string = 'CALENDAR_NEXT_MONTH';
export const CURRENT_MONTH: string = 'CALENDAR_CURRENT_MONTH';

export type CalendarAction = {
  type: string
};

export function nextMonth(): CalendarAction {
  return {
    type: NEXT_MONTH
  };
}

export function prevMonth(): CalendarAction {
  return {
    type: PREV_MONTH
  };
}

export function currentMonth(): CalendarAction {
  return {
    type: CURRENT_MONTH
  };
}

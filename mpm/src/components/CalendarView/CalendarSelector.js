// @flow

import { createSelector } from 'reselect';
import Moment from 'moment';

import type { AppState } from '../../reducers';

export type CalendarDay = {
  dayMoment: moment$Moment,
  isOtherMonth: boolean,
  key: string,
  isToday: boolean
};

const monthSelector = (state: AppState): Moment => state.calendar.month;

export const dateInMonthSelector = createSelector(
  monthSelector,
  (month: Moment): Array<Array<CalendarDay>> => {
    const startDate = month.clone().date(26).subtract(1, 'months');
    const endDate = startDate.clone().add(1, 'month').subtract(1, 'seconds');
    const today = Moment();
    var calStartDate = startDate.clone();
    while (calStartDate.day() !== 0) {
      calStartDate.subtract(1, 'days');
    }
    var calEndDate = endDate.clone();
    while (calEndDate.day() !== 6) {
      calEndDate.add(1, 'days');
    }

    var calDateList: Array<Array<CalendarDay>> = [];
    var dayDiff = calEndDate.diff(calStartDate, 'days') + 1;
    const numberOfWeeks = dayDiff / 7;

    var weekLoop = 0;
    var dayLoop = 0;

    for (weekLoop = 0; weekLoop < numberOfWeeks; weekLoop++) {
      var weekArray: Array<CalendarDay> = [];
      const dateAtWeek = weekLoop * 7;

      for (dayLoop = 0; dayLoop < 7; dayLoop++) {
        const dayMoment = calStartDate
          .clone()
          .add(dateAtWeek + dayLoop, 'days');
        const dayMomentDate = dayMoment.date();
        const isOtherMonth =
          (weekLoop === 0 && dayMomentDate < 26 && dayMomentDate > 10) ||
          (weekLoop + 1 === numberOfWeeks &&
            (dayMomentDate > 25 || dayMomentDate < 10));
        let weekData: CalendarDay = {
          dayMoment,
          isOtherMonth,
          key: dayMoment.format('DD-MM-YYYY'),
          isToday: dayMoment.isSame(today, 'day')
        };
        weekArray.push(weekData);
      }

      calDateList.push(weekArray);
    }

    return calDateList;
  }
);

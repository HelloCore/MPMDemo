// @flow
import React, { Component } from 'react';
import './CalendarViewCell.css';
import { connect } from 'react-redux';

import TimesheetCell from '../Timesheet/TimesheetCell';
import { timesheetSelector } from './CalendarSelector';

import type { AppState } from '../../reducers';
import type { CalendarDay } from './CalendarSelector';
import type { TimesheetObject } from '../../reducers/timesheet';

export type CalendarViewCellOwnProps = {
  date: CalendarDay
};

export type CalendarViewCellStateProps = {
  timesheet: Array<TimesheetObject>
};

export type CalendarViewCellProps = CalendarViewCellOwnProps &
  CalendarViewCellStateProps;

class CalendarViewCell extends Component<void, CalendarViewCellProps, void> {
  renderDay(date: CalendarDay) {
    return (
      <span
        className={
          'mpm-calendar-cell__title ' +
          (date.isToday ? 'mpm-calendar-cell__title-today' : '')
        }
      >
        {date.dayMoment.date()}
      </span>
    );
  }

  render() {
    const { date } = this.props;

    const todayClass = date.isToday ? 'mpm-calendar-cell__container-today' : '';
    const otherMonthClass = date.isOtherMonth
      ? 'mpm-calendar-cell__container-other-month'
      : '';

    const dateStr = date.dayMoment.format('DD-MM-YYYY');
    return (
      <div
        className={`mpm-calendar-cell__container ${todayClass} ${otherMonthClass}`}
      >
        {this.renderDay(date)}
        {!date.isOtherMonth &&
          <div className="mpm-calendar-cell__event-container" />}
        {this.props.timesheet.map(timesheet => {
          const projectCode = timesheet.projectCode;
          const startTime = timesheet.start.format('HH:mm:ss');
          const endTime = timesheet.end.format('HH:mm:ss');
          return (
            <TimesheetCell
              timesheet={timesheet}
              key={`${dateStr}${projectCode}${startTime}${endTime}`}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, props: CalendarViewCellOwnProps) => {
  return {
    timesheet: timesheetSelector(state, props)
  };
};

export default connect(mapStateToProps)(CalendarViewCell);

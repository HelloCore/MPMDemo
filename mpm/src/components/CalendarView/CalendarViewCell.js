// @flow
import React, { Component } from 'react';
import './CalendarViewCell.css';
import type { CalendarDay } from './CalendarSelector';

export type CalcendarViewCellProps = {
  date: CalendarDay
};

class CalendarViewCell extends Component<void, CalcendarViewCellProps, void> {
  render() {
    const { date } = this.props;

    const todayClass = date.isToday ? 'mpm-calendar-cell__container-today' : '';
    const otherMonthClass = date.isOtherMonth
      ? 'mpm-calendar-cell__container-other-month'
      : '';

    return (
      <div
        className={`mpm-calendar-cell__container ${todayClass} ${otherMonthClass}`}
      >
        <span className="mpm-calendar-cell__title">
          {date.dayMoment.date()}
        </span>
        {!date.isOtherMonth &&
          <div className="mpm-calendar-cell__event-container" />}
      </div>
    );
  }
}

export default CalendarViewCell;
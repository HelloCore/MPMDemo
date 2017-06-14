// @flow
import React, { Component } from 'react';
import './CalendarViewCell.css';
import type { CalendarDay } from './CalendarSelector';

export type CalcendarViewCellProps = {
  date: CalendarDay
};

class CalendarViewCell extends Component<void, CalcendarViewCellProps, void> {
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

    return (
      <div
        className={`mpm-calendar-cell__container ${todayClass} ${otherMonthClass}`}
      >
        {this.renderDay(date)}
        {!date.isOtherMonth &&
          <div className="mpm-calendar-cell__event-container" />}
      </div>
    );
  }
}

export default CalendarViewCell;

// @flow

import React, { Component } from 'react';
import './CalendarView.css';

import CalendarViewCell from './CalendarViewCell';
import { dateInMonthSelector } from './CalendarSelector';

import { nextMonth, prevMonth, currentMonth } from '../../actions/calendar';

import Moment from 'moment';

import { connect } from 'react-redux';
import { Button, Dropdown, Glyphicon, MenuItem } from 'react-bootstrap';

import type { AppState } from '../../reducers';
import type { CalendarDay } from './CalendarSelector';
import type { Dispatch } from 'redux';
import type { Action } from '../../actions/types';

export const WEEK_DAY_WITH_WEEKEND = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT'
];

export const WEEK_DAY_WITHOUT_WEEKEND = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

type CalendarViewProps = {
  dateInMonth: Array<Array<CalendarDay>>,
  month: Moment,
  today: Moment,
  toggleWeekend: boolean,
  dispatch: Dispatch<Action>
};

class CalendarView extends Component<void, CalendarViewProps, void> {
  _renderHeaderContainer() {
    if (
      this.props.month === undefined ||
      typeof this.props.month === 'string'
    ) {
      return <div />;
    }
    const monthTitle = this.props.month.format('MMMM YYYY');
    const isSameMonth = this.props.month.isSame(this.props.today, 'month');
    return (
      <div className="calendar-view__header-container">
        <div className="calendar-view__header-left-container calendar-view__header-wrapper" />
        <div className="calendar-view__header-middle-container calendar-view__header-wrapper">
          <h1>{monthTitle}</h1>
        </div>
        <div className="calendar-view__header-right-container calendar-view__header-wrapper">
          <Button
            onClick={() => {
              this.props.dispatch(prevMonth());
            }}
          >
            <Glyphicon glyph="menu-left" />
          </Button>
          <Button
            className="calendar-view__today-button"
            active={isSameMonth}
            onClick={() => {
              if (isSameMonth === false) {
                this.props.dispatch(currentMonth());
              }
            }}
          >
            Today
          </Button>
          <Button
            onClick={() => {
              this.props.dispatch(nextMonth());
            }}
          >
            <Glyphicon glyph="menu-right" />
          </Button>
          <Dropdown id="bg-vertical-dropdown-1">
            <Dropdown.Toggle bsStyle="success">
              <Glyphicon glyph="cog" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <MenuItem
                eventKey="1"
                onClick={() => {
                  // this.props.toggleWeekend();
                }}
              >
                <Glyphicon
                  glyph={this.props.isShowWeekEnd ? 'check' : 'unchecked'}
                />
                &nbsp;Show Weekend
              </MenuItem>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }

  _renderFooterContainer() {
    return (
      <div className="calendar-view__footer-container">
        <Button
          type="button"
          className="btn btn-default"
          onClick={() => {
            // this._onSaveButtonClick();
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            // this._onSaveButtonClick();
          }}
        >
          <Glyphicon glyph="floppy-disk" />
          &nbsp; Save
        </Button>
      </div>
    );
  }

  _renderCalendarHeader() {
    const headerData = this.props.isShowWeekEnd
      ? WEEK_DAY_WITH_WEEKEND
      : WEEK_DAY_WITHOUT_WEEKEND;
    return (
      <div className="calendar-view__calendar-header-row calendar-view__calendar-row">
        {headerData.map(day => {
          return (
            <div
              className={
                'calendar-view__calendar-header-cell calendar-view__calendar-cell'
              }
              key={day}
            >
              <span className="calendar-view__calender-header-label">
                {day}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  _renderCalendarBody() {
    if (
      this.props.dateInMonth === undefined ||
      this.props.dateInMonth.length === 0
    ) {
      return null;
    }

    return this.props.dateInMonth.map((weekArray, weekIndex) => {
      return (
        <div
          className="calendar-view__calendar-body-row calendar-view__calendar-row"
          key={'weekId-' + weekIndex}
        >
          {weekArray
            .filter((obj, index) => {
              return this.props.isShowWeekEnd || (index !== 0 && index !== 6);
            })
            .map(obj => {
              return (
                <div
                  className="calendar-view__calendar-body-cell calendar-view__calendar-cell"
                  key={obj.key}
                >
                  <CalendarViewCell date={obj} />
                </div>
              );
            })}
        </div>
      );
    });
  }
  render() {
    let cellClassName = this.props.isShowWeekEnd
      ? 'calendar-view__calendar-header-weekend-cell'
      : 'calendar-view__calendar-header-no-weekend-cell';
    return (
      <div className="calendar-view__container">
        {this._renderHeaderContainer()}
        <div className={`calendar-view__calendar-container ${cellClassName}`}>
          {this._renderCalendarHeader()}
          {this._renderCalendarBody()}
        </div>
        {this._renderFooterContainer()}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    dateInMonth: dateInMonthSelector(state),
    month: state.calendar.month,
    today: state.calendar.today,
    isWeekEnd: false
  };
};

export default connect(mapStateToProps)(CalendarView);

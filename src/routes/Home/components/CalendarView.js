import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  initialCalendar,
  changeCalendarMonth,
   nextMonth,
   prevMonth,
   currentMonth
} from '../modules/CalendarReducer'

import Moment from 'moment'
import './CalendarView.scss'

import CalendarViewCell from './CalendarViewCell'

export const WEEK_DAY_WITH_WEEKEND = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const WEEK_DAY_WITHOUT_WEEKEND = ['MON', 'TUE', 'WED', 'THU', 'FRI'];


class CalendarView extends Component {
    constructor(props){
      super(props);
      this.state = {
        isShowWeekend: true,
      }
    }

    componentWillMount() {
      this.props.initialCalendar();
    }

    _renderHeaderContainer() {
      const month = Moment( this.props.month ,'M');
      const monthTitle = month.format('MMMM YYYY');
      const isSameMonth = month.isSame(this.props.today ,'month');
      const todayBtnActiveClass = isSameMonth? 'active' : ''

      return (
        <div className='calendar-view__header-container'>
          <div className='calendar-view__header-left-container calendar-view__header-wrapper'>
          </div>
          <div className='calendar-view__header-middle-container calendar-view__header-wrapper'>
            <h1>{monthTitle}</h1>
          </div>
          <div className='calendar-view__header-right-container calendar-view__header-wrapper'>
            <button type="button" className="btn btn-default" onClick={() => { this.props.prevMonth(); }}>
              <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
            </button>
            <button type="button" className={`btn btn-default ${todayBtnActiveClass}`} onClick={ isSameMonth? (()=>{}) : (() => { this.props.currentMonth(); }) }>Today</button>
            <button type="button" className="btn btn-default" onClick={() => { this.props.nextMonth(); }}>
              <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      );
    }

    _renderFooterContainer() {
      return (
        <div className='calendar-view__footer-container'>
          <button type="button" className="btn btn-primary" onClick={() => { this._onSaveButtonClick(); }}>
            <span className="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
             Save
          </button>
          <button type="button" className="btn btn-default" onClick={() => { this._onSaveButtonClick(); }}>
            Cancel
          </button>
        </div>
      );
    }

    _renderCalendarHeader() {
      const headerData = this.state.isShowWeekend? WEEK_DAY_WITH_WEEKEND: WEEK_DAY_WITHOUT_WEEKEND
      return (
        <div className='calendar-view__calendar-header-row calendar-view__calendar-row'>
          {headerData.map((day) => {
            return (
              <div className={'calendar-view__calendar-header-cell calendar-view__calendar-cell'} key={day}>
                <span className='calendar-view__calender-header-label'>{day}</span>
              </div>
            )
          })}
        </div>
      );
    }

    _renderCalendarBody() {

      if(this.props.calDateList === null || this.props.calDateList.length === 0){
        return null
      }


      return this.props.calDateList.map((weekArray, weekIndex) => {
                return (
                  <div className='calendar-view__calendar-body-row calendar-view__calendar-row' key={'weekId-' + weekIndex}>
                    {
                      weekArray.filter((obj, index) => {
                        return this.state.isShowWeekend || (index !== 0 && index !== 6);
                      }).map((obj) => {
                        return (
                          <div className='calendar-view__calendar-body-cell calendar-view__calendar-cell' key={obj.key}>
                            <CalendarViewCell  dateObject={obj} />
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
    }

    render () {
      let cellClassName = this.state.isShowWeekend? 'calendar-view__calendar-header-weekend-cell': 'calendar-view__calendar-header-no-weekend-cell'
      return (
        <div className='calendar-view__container'>
          { this._renderHeaderContainer() }
          <div className={`calendar-view__calendar-container ${cellClassName}`}>
              { this._renderCalendarHeader() }
              { this._renderCalendarBody() }
          </div>
          { this._renderFooterContainer() }
        </div>
      )
    }

    _onSaveButtonClick() {

    }
}

CalendarView.defaultProps = {

}

const mapDispatchToProps = {
  changeCalendarMonth,
  initialCalendar,
  nextMonth,
  prevMonth,
  currentMonth,
}

const mapStateToProps = (state) => {
  return {
    eventData : state.timesheet.eventData,
    today : state.calendar.today,
    month : state.calendar.month,
    startDate : state.calendar.startDate,
    endDate : state.calendar.endDate,
    calDateList: state.calendar.calDateList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView)

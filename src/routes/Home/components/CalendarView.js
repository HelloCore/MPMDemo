import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { initialCalendar, changeCalendarMonth } from '../modules/CalendarReducer'
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

    _renderHeader() {
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

    _renderBody() {

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
        <div className={`calendar-view__calendar-container ${cellClassName}`}>
            { this._renderHeader() }
            { this._renderBody() }
        </div>
      )
    }

}

CalendarView.defaultProps = {

}

const mapDispatchToProps = {
  changeCalendarMonth,
  initialCalendar
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

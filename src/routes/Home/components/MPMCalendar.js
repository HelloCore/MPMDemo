import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { initialCalendar, changeCalendarMonth } from '../modules/MPMCalendarReducer'
import Moment from 'moment'
import './MPMCalendar.scss'

import MPMCalendarCell from './MPMCalendarCell'

export const WEEK_DAY_WITH_WEEKEND = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const WEEK_DAY_WITHOUT_WEEKEND = ['MON', 'TUE', 'WED', 'THU', 'FRI'];


class MPMCalendar extends Component {
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
        <div className='mpm-calendar__calendar-header-row mpm-calendar__calendar-row'>
          {headerData.map((day) => {
            return (
              <div className={'mpm-calendar__calendar-header-cell mpm-calendar__calendar-cell'} key={day}>
                <span className='mpm-calendar__calender-header-label'>{day}</span>
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
                  <div className='mpm-calendar__calendar-body-row mpm-calendar__calendar-row' key={'weekId-' + weekIndex}>
                    {
                      weekArray.filter((obj, index) => {
                        return this.state.isShowWeekend || (index !== 0 && index !== 6);
                      }).map((obj) => {
                        const dayMoment = obj.dayMoment;
                        return (
                          <div className='mpm-calendar__calendar-body-cell mpm-calendar__calendar-cell' key={dayMoment.format('DD-MM-YYYY')}>
                            <MPMCalendarCell  dateObject={obj} />
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
    }

    render () {
      let cellClassName = this.state.isShowWeekend? 'mpm-calendar__calendar-header-weekend-cell': 'mpm-calendar__calendar-header-no-weekend-cell'
      return (
        <div className={`mpm-calendar__calendar-container ${cellClassName}`}>
            { this._renderHeader() }
            { this._renderBody() }
        </div>
      )
    }

}

MPMCalendar.defaultProps = {

}

const mapDispatchToProps = {
  changeCalendarMonth,
  initialCalendar
}

const mapStateToProps = (state) => {
  return {
    eventData : state.home.eventData,
    today : state.MPMCalendarReducer.today,
    month : state.MPMCalendarReducer.month,
    startDate : state.MPMCalendarReducer.startDate,
    endDate : state.MPMCalendarReducer.endDate,
    calDateList: state.MPMCalendarReducer.calDateList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MPMCalendar)

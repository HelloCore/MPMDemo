import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { initialCalendar, changeCalendarMonth } from '../modules/MPMCalendarReducer'
import Moment from 'moment'
import './MPMCalendar.scss'

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
      const className = this.state.isShowWeekend? 'mpm-calendar__table-header-weekend': 'mpm-calendar__table-header-no-weekend'
      return (
        <thead>
          <tr className={className}>
            {headerData.map((day) => {
              return <th key={day}>{day}</th>
            })}
          </tr>
        </thead>
      );
    }

    _renderBody() {

      if(this.props.calDateList === null || this.props.calDateList.length === 0){
        return null
      }

      return (
          <tbody>
            {
              this.props.calDateList.map((weekArray, weekIndex) => {
                return (
                  <tr key={'weekId-' + weekIndex}>
                    {
                      weekArray.filter((dayMoment) => {
                        return this.state.isShowWeekend || (dayMoment.day() !== 0 && dayMoment.day() !== 6);
                      }).map((dayMoment) => {
                        return (
                          <td key={dayMoment.format('DD-MM-YYYY')}>{dayMoment.date()}</td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
        </tbody>
      );
    }

    render () {
      return (
        <table className='mpm-calendar__table-container'>
            { this._renderHeader() }
            { this._renderBody() }
        </table>
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

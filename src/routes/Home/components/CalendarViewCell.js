import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import './CalendarViewCell.scss'

export const WEEK_DAY_WITH_WEEKEND = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const WEEK_DAY_WITHOUT_WEEKEND = ['MON', 'TUE', 'WED', 'THU', 'FRI'];


class CalendarViewCell extends Component {
  render() {
    const dayMoment = this.props.dateObject.dayMoment;
    if(typeof(dayMoment) === 'string'){
      return <div></div>
    }

    const todayClass = this.props.dateObject.isToday? 'mpm-calendar-cell__container-today' : ''
    const otherMonthClass = this.props.dateObject.isOtherMonth? 'mpm-calendar-cell__container-other-month' : ''

    return (<div className={`mpm-calendar-cell__container ${todayClass} ${otherMonthClass}`}>
              <span className='mpm-calendar-cell__title'>{dayMoment.date()}</span>
              {!this.props.dateObject.isOtherMonth &&
                <div className='mpm-calendar-cell__event-container'>

                </div>
              }
            </div>)
  }
}

CalendarViewCell.propTypes = {
  dateObject: React.PropTypes.object.isRequired
}

const mapDispatchToProps = {

}

const mapStateToProps = (state, ownProps) => {
  return {
    timesheetList: state.timesheet.timesheetList[ownProps.key]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarViewCell)

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import './MPMCalendarCell.scss'

export const WEEK_DAY_WITH_WEEKEND = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const WEEK_DAY_WITHOUT_WEEKEND = ['MON', 'TUE', 'WED', 'THU', 'FRI'];


class MPMCalendarCell extends Component {
  render() {
    const dayMoment = this.props.dateObject.dayMoment;
    const className = this.props.dateObject.isToday? 'mpm-calendar-cell__container-today' : ''

    return (<div className={`mpm-calendar-cell__container ${className}`}>
              <span className='mpm-calendar-cell__title'>{dayMoment.date()}</span>
              <div className='mpm-calendar-cell__event-container'>

              </div>
            </div>)
  }
}

MPMCalendarCell.defaultProps = {

}

const mapDispatchToProps = {

}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MPMCalendarCell)

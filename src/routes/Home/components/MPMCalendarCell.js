import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import './MPMCalendarCell.scss'

export const WEEK_DAY_WITH_WEEKEND = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const WEEK_DAY_WITHOUT_WEEKEND = ['MON', 'TUE', 'WED', 'THU', 'FRI'];


class MPMCalendarCell extends Component {
  render() {
    return (<td className='mpm-calendar-cell__container'>
              <span className='mpm-calendar-cell__title'>{this.props.date.date()}</span>
            </td>)
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

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchEvent } from '../../modules/home'
import Moment from 'moment'
import './MPMCalendar.scss'

export const WEEK_DAY_WITH_WEEKEND = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const WEEK_DAY_WITHOUT_WEEKEND = ['MON', 'TUE', 'WED', 'THU', 'FRI'];


class MPMCalendar extends Component {
    constructor(props){
      super(props);
      this.state = {
        isShowWeekend: false,
      }
    }

    _renderHeader() {
      const headerData = this.state.isShowWeekend? WEEK_DAY_WITH_WEEKEND: WEEK_DAY_WITHOUT_WEEKEND
      const className = this.state.isShowWeekend? 'mpm-calendar__table-header-weekend': 'mpm-calendar__table-header-no-weekend'
      return (
        <tr className={className}>
          {headerData.map((day) => {
            return <th key={day}>{day}</th>
          })}
        </tr>
      );
    }

    render () {
      return (
        <table className='mpm-calendar__table-container'>
          <thead>
            { this._renderHeader() }
          </thead>
        </table>
      )
    }

}

const mapDispatchToProps = {
  fetchEvent
}
const mapStateToProps = (state) => ({
  eventData : state.eventData
})
export default connect(mapStateToProps, mapDispatchToProps)(MPMCalendar)

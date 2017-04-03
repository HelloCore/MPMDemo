import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, DropdownButton, Glyphicon, MenuItem } from 'react-bootstrap';

import Moment from 'moment'

import {
  changeCalendarMonth,
  nextMonth,
  prevMonth,
  currentMonth,
} from '../modules/CalendarReducer'

import {
  toggleWeekend,
} from '../modules/CalendarConfigReducer'

import './CalendarView.scss'

import CalendarViewCell from './CalendarViewCell'

export const WEEK_DAY_WITH_WEEKEND = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const WEEK_DAY_WITHOUT_WEEKEND = ['MON', 'TUE', 'WED', 'THU', 'FRI'];


class CalendarView extends Component {
    constructor(props){
      super(props);
    }

    componentWillMount() {

    }

    _renderHeaderContainer() {
      if(this.props.month === undefined || typeof(this.props.month) === 'string'){
        return <div></div>
      }
      const monthTitle = this.props.month.format('MMMM YYYY');
      const isSameMonth = this.props.month.isSame(this.props.today ,'month');

      return (
        <div className='calendar-view__header-container'>
          <div className='calendar-view__header-left-container calendar-view__header-wrapper'>
          </div>
          <div className='calendar-view__header-middle-container calendar-view__header-wrapper'>
            <h1>{monthTitle}</h1>
          </div>
          <div className='calendar-view__header-right-container calendar-view__header-wrapper'>
            <Button onClick={() => { this.props.prevMonth(); }}>
              <Glyphicon glyph="menu-left" />
            </Button>
            <Button active={isSameMonth} onClick={ isSameMonth? (()=>{}) : (() => { this.props.currentMonth(); }) }>Today</Button>
            <Button onClick={() => { this.props.nextMonth(); }}>
              <Glyphicon glyph="menu-right" />
            </Button>
            <Dropdown id="bg-vertical-dropdown-1">
              <Dropdown.Toggle bsStyle="success">
                <Glyphicon glyph="cog" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem eventKey='1' onClick={() => {
                    this.props.toggleWeekend();
                  }}>
                  <Glyphicon glyph={this.props.isShowWeekEnd? 'check' : 'unchecked'} />
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
        <div className='calendar-view__footer-container'>
          <Button type="button" className="btn btn-primary" onClick={() => { this._onSaveButtonClick(); }}>
            <Glyphicon glyph="floppy-disk" />
             &nbsp; Save
          </Button>
          <Button type="button" className="btn btn-default" onClick={() => { this._onSaveButtonClick(); }}>
            Cancel
          </Button>
        </div>
      );
    }

    _renderCalendarHeader() {
      const headerData = this.props.isShowWeekEnd? WEEK_DAY_WITH_WEEKEND: WEEK_DAY_WITHOUT_WEEKEND
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

      if(this.props.calDateList === undefined || this.props.calDateList.length === 0){
        return null
      }


      return this.props.calDateList.map((weekArray, weekIndex) => {
                return (
                  <div className='calendar-view__calendar-body-row calendar-view__calendar-row' key={'weekId-' + weekIndex}>
                    {
                      weekArray.filter((obj, index) => {
                        return this.props.isShowWeekEnd || (index !== 0 && index !== 6);
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
      let cellClassName = this.props.isShowWeekEnd? 'calendar-view__calendar-header-weekend-cell': 'calendar-view__calendar-header-no-weekend-cell'
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
  nextMonth,
  prevMonth,
  currentMonth,
  toggleWeekend,
}

const mapStateToProps = (state) => {
  return {
    eventData : state.timesheet.eventData,
    today : state.calendar.today,
    month : state.calendar.month,
    calDateList: state.calendar.calDateList,
    isShowWeekEnd: state.calendarConfig.isShowWeekEnd,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView)

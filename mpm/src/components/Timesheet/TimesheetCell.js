// @flow
import React, { Component } from 'react';
import './TimesheetCell.css';
import { connect } from 'react-redux';

import type { AppState } from '../../reducers';
import type { TimesheetObject } from '../../reducers/timesheet';

export type TimesheetCellOwnProps = {
  timesheet: TimesheetObject
};

export type TimesheetCellStateProps = {};
export type TimesheetCellProps = TimesheetCellOwnProps &
  TimesheetCellStateProps;

class TimesheetCell extends Component<void, TimesheetCellProps, void> {
  render() {
    return (
      <div>{this.props.timesheet.start.format('DD-MM-YYYY HH:mm:ss')}</div>
    );
  }
}

const mapStateToProps = (state: AppState, props: TimesheetCellOwnProps) => {
  return {};
};

export default connect(mapStateToProps)(TimesheetCell);

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
  renderFooter() {
    if (this.props.timesheet.isTemporary) {
      return (
        <div className="timesheet-cell__card-right">
          <button className="btn btn-warning btn-xs">
            <span className="glyphicon glyphicon-edit" />
          </button>
          <button className="btn btn-danger btn-xs">
            <span className="glyphicon glyphicon-trash" />
          </button>
        </div>
      );
    } else {
      return (
        <div className="timesheet-cell__card-right">
          <button className="btn btn-danger btn-xs">
            <span className="glyphicon glyphicon-trash" />
          </button>
        </div>
      );
    }
  }

  renderMemo() {
    const { memo } = this.props.timesheet;
    if (memo !== undefined && memo.length > 0) {
      return <p>{memo}</p>;
    } else {
      return null;
    }
  }

  render() {
    var className = 'timesheet-cell__card-container';
    if (this.props.timesheet.isTemporary) {
      className += ' timesheet-cell__card-container-temp';
    }

    return (
      <div className={className}>
        <div className="timesheet-cell__card-left">
          <span className="label label-primary">
            {this.props.timesheet.start.format('HH:mm')}-{this.props.timesheet.end.format('HH:mm')}
          </span>
          {' '}
          <span className="label label-success">
            {this.props.timesheet.taskName}
          </span>
          <h5>
            [{this.props.timesheet.projectCode}]{' '}
            {this.props.timesheet.projectName}
          </h5>
          {this.renderMemo()}
        </div>
        {this.renderFooter()}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, props: TimesheetCellOwnProps) => {
  return {};
};

export default connect(mapStateToProps)(TimesheetCell);

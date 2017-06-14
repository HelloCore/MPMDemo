// @flow
import Moment from 'moment';
import type { TimesheetAction } from '../actions/timesheet';

export type TimesheetObject = {
  projectCode: string,
  projectName: string,
  taskName: string,
  start: Moment,
  end: Moment
};
export type TimesheetState = {
  serverTimesheet: { [date: string]: Array<TimesheetObject> },
  clientTimesheet: { [date: string]: Array<TimesheetObject> }
};

const initialState: TimesheetState = {
  serverTimesheet: {
    '06-06-2017': [
      {
        projectCode: 'PSPD-1234',
        projectName: 'Hello World Server',
        taskName: 'C-001 Code/Implement',
        start: Moment('06-06-2017 10:00:00', 'DD-MM-YYYY HH:mm:ss'),
        end: Moment('06-06-2017 18:00:00', 'DD-MM-YYYY HH:mm:ss')
      },
      {
        projectCode: 'PSPD-1234',
        projectName: 'Hello World Server',
        taskName: 'C-001 Code/Implement',
        start: Moment('06-06-2017 12:00:00', 'DD-MM-YYYY HH:mm:ss'),
        end: Moment('06-06-2017 18:00:00', 'DD-MM-YYYY HH:mm:ss')
      }
    ]
  },
  clientTimesheet: {
    '06-06-2017': [
      {
        projectCode: 'PSPD-1234',
        projectName: 'Hello World Client',
        taskName: 'C-001 Code/Implement',
        start: Moment('06-06-2017 09:00:00', 'DD-MM-YYYY HH:mm:ss'),
        end: Moment('06-06-2017 18:00:00', 'DD-MM-YYYY HH:mm:ss')
      },
      {
        projectCode: 'PSPD-1234',
        projectName: 'Hello World Client',
        taskName: 'C-001 Code/Implement',
        start: Moment('06-06-2017 11:00:00', 'DD-MM-YYYY HH:mm:ss'),
        end: Moment('06-06-2017 18:00:00', 'DD-MM-YYYY HH:mm:ss')
      }
    ]
  }
};

export default function timesheetReducer(
  state: TimesheetState = initialState,
  action: TimesheetAction
) {
  return state;
}

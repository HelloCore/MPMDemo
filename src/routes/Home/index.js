import { injectReducer } from '../../store/reducers'

// Sync route definition
export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const HomeContainer = require('./containers/HomeContainer').default
      const CalendarReducer = require('./modules/CalendarReducer').default
      const TimesheetReducer = require('./modules/TimesheetReducer').default

      injectReducer(store, { key: 'calendar', reducer: CalendarReducer})
      injectReducer(store, { key: 'timesheet', reducer: TimesheetReducer})

      cb(null, HomeContainer)

    }, '/')
  }
})

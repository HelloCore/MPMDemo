import { combineReducers } from 'redux'
import locationReducer from './location'

import calendarReducer from '../routes/Home/modules/CalendarReducer'
import timesheetReducer from '../routes/Home/Modules/TimesheetReducer'
import userReducer from '../routes/Home/modules/UserReducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    user: userReducer,
    timesheet: timesheetReducer,
    calendar: calendarReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

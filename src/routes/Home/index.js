import { injectReducer } from '../../store/reducers'

// Sync route definition
export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const HomeContainer = require('./containers/HomeContainer').default
      const MPMCalendarReducer = require('./modules/MPMCalendarReducer').default
      const home = require('./modules/home').default

      injectReducer(store, { key: 'MPMCalendarReducer', reducer: MPMCalendarReducer})
      injectReducer(store, { key: 'home', reducer: home})

      cb(null, HomeContainer)

    }, '/')
  }
})

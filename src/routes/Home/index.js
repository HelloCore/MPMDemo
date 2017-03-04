import { injectReducer } from '../../store/reducers'

// Sync route definition
export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const HomeContainer = require('./containers/HomeContainer').default

      cb(null, HomeContainer)

    }, '/')
  }
})

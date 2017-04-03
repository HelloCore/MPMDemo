import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { persistStore, autoRehydrate } from 'redux-persist'


class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { rehydrated: false }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if(nextState.rehydrated != this.state.rehydrated){
      return true;
    }
    return false
  }

  componentWillMount(){
    persistStore(this.props.store, { whitelist: ['user','calendarConfig']}, () => {
      this.setState({ rehydrated: true })
    })
    // .purge()
  }

  render () {
    const { routes, store } = this.props
    if(this.state.rehydrated === false){
      return <div></div>
    }
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer

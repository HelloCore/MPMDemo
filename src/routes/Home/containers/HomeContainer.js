import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CalendarView from '../components/CalendarView'

import { login } from '../modules/UserReducer'

class HomeContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedIn: props.userData !== undefined,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      isLoggedIn: nextProps.userData !== undefined,
    })
  }

  componentWillMount() {
    console.log(this);
    // this.props.userData == 'undefined'
  }

  render() {
    return (
      <div>
        <CalendarView />
      </div>
    )
  }
}


const mapDispatchToProps = {
  login,
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
    isLoading: (state.user.isLoading || state.timesheet.isLoading),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)

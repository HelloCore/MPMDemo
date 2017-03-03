import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CalendarView from '../components/CalendarView'

class HomeContainer extends Component {

  render() {
    return (
      <div>
        <CalendarView />
      </div>
    )
  }
}


const mapDispatchToProps = {

}
const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)

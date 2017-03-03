import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MPMCalendar from '../components/MPMCalendar'

class HomeContainer extends Component {

  render() {
    return (
      <div>
        <MPMCalendar />
      </div>
    )
  }
}


const mapDispatchToProps = {

}
const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)

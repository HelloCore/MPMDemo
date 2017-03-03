import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MPMCalendar from './MPMCalendar'
import './HomeView.scss'

class HomeView extends Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)

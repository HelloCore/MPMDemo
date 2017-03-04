import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Spinner from 'react-spinkit'

import './CoreLayout.scss'
import '../../styles/core.scss'

class CoreLayout extends Component {
  render(){
    return (
      <div className='mainContainer'>
        <Header />
        <div className='container text-center'>
          <div className='core-layout__viewport'>
            {this.props.children}
          </div>
        </div>
        {this.props.isLoading &&
          <div className='core-layout__global-loading-container'>
            <div className='core-layout__global-loading'>
              <Spinner spinnerName="three-bounce" />
            </div>
          </div>
        }
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

const mapDispatchToProps = {

}

const mapStateToProps = (state) => {
  return {
    isLoading: (state.user.isLoading || state.timesheet.isLoading),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)

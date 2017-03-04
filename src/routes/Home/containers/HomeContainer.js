import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CalendarView from '../components/CalendarView'
import { Modal, Button } from 'react-bootstrap'

import { login } from '../modules/UserReducer'

class HomeContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedIn: props.userData !== undefined,
      username: '',
      password: '',

    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      isLoggedIn: nextProps.userData !== undefined,
    })
  }

  componentWillMount() {
    if(this.props.isLoggedIn == false){

    }
    console.log(this);
    // this.props.userData == 'undefined'
  }

  _onRequestLogin() {
    const username = this.state.username;
    const password = this.state.password;
    if(username.length > 0 && password.length > 0){
      this.props.login({
        username,
        password,
      })
    }
  }

  render() {
    const hasUsernameError = this.state.username.length == 0;
    const hasPasswordError = this.state.password.length == 0;


    return (
      <div>
        <CalendarView />
        {!this.props.isLoggedIn &&
          <Modal show={!this.props.isLoggedIn}>
            <Modal.Header>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={'form-group'+(hasUsernameError? ' has-error' :'') }>
                <label className='control-label'>Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="usernameTextField"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={(e)=>{
                    this.setState({
                      username: e.target.value,
                      hasUsernameError: false,
                    })
                 }} />
              </div>
              <div className={'form-group' +(hasPasswordError? ' has-error' :'') }>
                <label className='control-label'>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordTextField"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e)=>{
                    this.setState({
                      password: e.target.value,
                      hasPasswordError: false,
                    })
                }} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle='primary' onClick={() => { this._onRequestLogin() }}>Login</Button>
            </Modal.Footer>
          </Modal>
        }
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

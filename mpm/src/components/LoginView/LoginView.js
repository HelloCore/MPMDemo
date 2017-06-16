// @flow
import React, { Component } from 'react';
import './LoginView.css';
import { connect } from 'react-redux';

import type { AppState } from '../../reducers';

export type LoginViewOwnProps = {};

export type LoginViewStateProps = {};

export type LoginViewProps = LoginViewOwnProps & LoginViewStateProps;

class LoginView extends Component<void, LoginViewProps, void> {
  render() {
    return (
      <div className="login-view__login-container">
        <div className="login-view__login-wrapper">
          <div className="form-group">
            <label htmlFor="usernameInput">Username</label>
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
            />
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" /> Remember Password
            </label>
          </div>
          <button className="btn btn-primary btn-block">Login</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, props: LoginViewOwnProps) => {
  return {};
};

export default connect(mapStateToProps)(LoginView);

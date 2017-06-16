// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { AppState } from '../reducers';

import 'bootstrap/dist/css/bootstrap.css';
import './HomeContainer.css';

import CalendarView from '../components/CalendarView/CalendarView';
import TemplateView from '../components/TemplateView/TemplateView';
import LoginView from '../components/LoginView/LoginView';

export type HomeContainerProps = {
  isLoggedIn: boolean
};

class HomeContainer extends Component<void, HomeContainerProps, void> {
  renderHeader() {
    return (
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">
              MPM
            </a>
          </div>
        </div>
      </nav>
    );
  }

  renderBody() {
    if (this.props.isLoggedIn === false) {
      return (
        <div className="container-fluid">
          <div className="col-md-12">
            <LoginView />
          </div>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="col-md-3">
          <TemplateView />
        </div>
        <div className="col-md-9">
          <CalendarView />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, props: {}) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(mapStateToProps)(HomeContainer);

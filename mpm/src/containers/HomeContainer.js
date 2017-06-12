// @flow

import React, { Component } from 'react';

import CalendarView from '../components/CalendarView/CalendarView';
import 'bootstrap/dist/css/bootstrap.css';

class HomeContainer extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-static-top" />
        <div className="container">
          <div className="col-md-2" />
          <div className="col-md-9 col-md-offset-1">
            <CalendarView />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;

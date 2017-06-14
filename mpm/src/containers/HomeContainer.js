// @flow

import React, { Component } from 'react';

import CalendarView from '../components/CalendarView/CalendarView';
import 'bootstrap/dist/css/bootstrap.css';
import './HomeContainer.css';

import TemplateView from '../components/TemplateView/TemplateView';

class HomeContainer extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-static-top" />
        <div className="container-fluid">
          <div className="col-md-3">
            <TemplateView />
          </div>
          <div className="col-md-9">
            <CalendarView />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;

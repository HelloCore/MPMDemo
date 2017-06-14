// @flow

import React, { Component } from 'react';
import './TemplateView.css';

import TemplateCell from './TemplateCell';

import { connect } from 'react-redux';
import type { AppState } from '../../reducers';

export type TemplateProps = {};

class TemplateView extends Component<void, TemplateProps, void> {
  render() {
    return (
      <div className="template-view__container-view">
        <h4>Templates</h4>
        <div className="template-view__cell-container">
          <TemplateCell className="label-warning" />
          <TemplateCell className="label-warning" />
          <TemplateCell className="label-warning" />
          <TemplateCell className="label-warning" />
          <TemplateCell className="label-warning" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

export default connect(mapStateToProps)(TemplateView);

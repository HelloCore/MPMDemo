// @flow

import React, { Component } from 'react';
import './TemplateCell.css';

import { connect } from 'react-redux';
import type { AppState } from '../../reducers';

export type TemplateCellProps = {};

class TemplateCell extends Component<void, TemplateCellProps, void> {
  render() {
    return (
      <div className="template-cell__container">
        <span className="template-cell__delete-btn">
          <span className="glyphicon glyphicon-remove" aria-hidden="true" />
        </span>
        <span className="template-cell__time-badge">09:00-18:00</span>
        <h5>DV Platform "x" foundation </h5>
        <p>C-001 Code/Implement</p>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

export default connect(mapStateToProps)(TemplateCell);

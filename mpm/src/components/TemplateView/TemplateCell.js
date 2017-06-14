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
        <span className="template-cell__delete-btn template-cell__icon-close">
          <span className="glyphicon glyphicon-remove " aria-hidden="true" />
        </span>
        <span className="label label-primary">09:00-18:00</span>
        {' '}
        <span className="label label-success">
          C-001 Code/Implement
        </span>
        <h5>[PSPD-1234] DV Platform "x" foundation </h5>
        <p>This is my memo</p>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

export default connect(mapStateToProps)(TemplateCell);

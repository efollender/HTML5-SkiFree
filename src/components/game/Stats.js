import React, {Component, PropTypes} from 'react';
import {toJS} from 'immutable';
import classNames from 'classnames';
import StyleSheet from './Game.styl';

export default class Stats extends Component {
  static propTypes = {
    moving: PropTypes.bool
  };
  render() {
    const {moving} = this.props;
    return (
      <div className={StyleSheet.Stats}>
        <p>{ moving ? 'Started!' : 'Paused'}</p>
      </div>
    );
  }
}
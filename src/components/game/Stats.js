import React, {Component, PropTypes} from 'react';
import {toJS} from 'immutable';
import classNames from 'classnames';
import StyleSheet from './Game.styl';

export default class Stats extends Component {
  static propTypes = {
    moving: PropTypes.bool,
    altitude: PropTypes.number
  };
  render() {
    const {moving, altitude} = this.props;
    return (
      <div className={StyleSheet.Stats}>
        <p>{ moving ? 'Started!' : 'Paused'}</p>
        <p>Altitude: {altitude}ft</p>
      </div>
    );
  }
}
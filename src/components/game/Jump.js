import React, {Component, PropTypes} from 'react';
import {toJS} from 'immutable';
import classNames from 'classnames';
import StyleSheet from './Game.styl';

export default class Jump extends Component {
  static propTypes = {
    coords: PropTypes.object
  };
  render() {
    const coords = this.props.coords.toJS();
    const styles = {
      top: coords.y,
      left: coords.x
    };
    return (
      <div className={StyleSheet.Jump} style={styles} />
    );
  }
}
import React, {Component} from 'react';
import {toJS} from 'immutable';
import classNames from 'classnames';
import StyleSheet from './Game.styl';

export default class Skier extends Component {
  getPosition() {
    const skier = this.props.status.toJS();
    switch (skier.position) {
      case 'down':
        return 'assets/player_down.png';
        break;
      case 'left':
        return 'assets/player_side.png';
        break;
      case 'right':
        return 'assets/player_side.png';
        break;
    }
    return 'assets/player_side.png';
  }
  render() {
    const skier = this.props.status.toJS();
    return (
      <div className={StyleSheet.Skier}>
        <img className={classNames({
          down: skier.position === 'down',
          left: skier.position === 'left',
          right: skier.position === 'right'
        })} src={this.getPosition()}/>
      </div>
    );
  }
}
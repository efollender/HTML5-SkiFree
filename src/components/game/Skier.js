import React, {Component} from 'react';
import {toJS} from 'immutable';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import Crafty from 'craftyjs';
import StyleSheet from './Game.styl';

export default class Skier extends Component{
  crafty() {
    this.el = Crafty.e('Skier, 2D, DOM, Image, Collision')
              .attr({
                x: 0, 
                y: 0, 
                w: 15, 
                h: 34})
              .image(this.getImage())
              .DOM(findDOMNode(this.refs.skier))
              .onHit('Tree', () => {
                //TODO: Change image on hit
                console.log(this.el, 'hit');
                this.props.handleTree();
                setTimeout(this.props.resetSkier, 2000);
              });
  }
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
    return 'assets/player_down.png';
  }
  getStatus() {
    const skier = this.props.status.toJS();
    return `assets/${skier[skier.state].asset}`;
  }
  getImage() {
    const skier = this.props.status.toJS();
    if (skier.state !== 'default')
      return this.getStatus();
    else {
      return this.getPosition();
    }
  }
  componentDidMount() {
    this.crafty();
  }
  render() {
    const skier = this.props.status.toJS();
    return (
      <div className={StyleSheet.Skier} 
        ref="skier" 
        style={{backgroundImage: `url(${this.getImage})`}} />
    );
  }
}
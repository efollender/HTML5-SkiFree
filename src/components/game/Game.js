import React, {Component} from 'react';
import {shouldPureComponentUpdate} from 'react-pure-render';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import StyleSheet from './Game.styl';
import Skier from './Skier';
import Tree from './Tree';
import Stats from './Stats';
import * as actionCreators from '../../action_creators';

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

const mapStateToProps = state => {
  return {
    skier: state.getIn(['game','skier']),
    trees: state.getIn(['game', 'trees']),
    stats: state.getIn(['game', 'stats'])
  };
};

class Game extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  handleCollision() {

  }
  handleKeydown(e) {
    e.preventDefault();
    switch(e.keyCode) {
      case 37:
        this.props.moveLeft();
        break;
      case 39:
        this.props.moveRight();
        break;
      case 13:
        this.start();
        break;
      default:
        this.props.moveDown();
        break;
    }
  }
  handleJump() {

  }
  generateTree() {
    const gameSpace = findDOMNode(this.refs.gameWrapper);
    const randomY = Math.floor(Math.random() * gameSpace.clientHeight);
    const randomX = Math.floor(Math.random() * gameSpace.firstChild.clientWidth);
    return({randomX, randomY});
  }
  start() {
    this.props.startGame();
  }
  end() {

  }
  getAnimation() {
    const stats = this.props.stats.toJS();
    return requestAnimFrame(() => {
      this.keyFrame = this.getAnimation();
      if (stats.moving) {
        this.props.updateTrees();
      }
    });
  }
  componentDidMount() {
    for (let i=0; i < 6; i++){
      this.props.addTree(this.generateTree());
    } 
    this.listener = document.addEventListener('keydown', this.handleKeydown.bind(this), false);
    this.keyFrame = this.getAnimation();
  }
  componentWillUnmount() {
    document.removeEventListener(this.listener, false);
  }
  render() {
    const {trees, skier} = this.props;
    return (
      <div className={StyleSheet.wrapper}
        ref="gameWrapper">
        <Skier status={skier} />
        {trees.map((tree, index) => {
          return <Tree key={`tree-${index}`} coords={tree}/>;
        })}
        <Stats {...this.props.stats.toJS()} />
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Game);

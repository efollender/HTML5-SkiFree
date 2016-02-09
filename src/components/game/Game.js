import React, {Component} from 'react';
import {shouldPureComponentUpdate} from 'react-pure-render';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import StyleSheet from './Game.styl';
import Skier from './Skier';
import Tree from './Tree';
import * as actionCreators from '../../action_creators';

const mapStateToProps = state => {
  return {
    skier: state.getIn(['game','skier']),
    trees: state.getIn(['game', 'trees'])
  };
};

class Game extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  handleCollision() {

  }
  handleKeydown(e) {
    e.preventDefault();
    console.log('event',e, this);
    switch(e.keyCode) {
      case 37:
        this.props.moveLeft();
        break;
      case 39:
        this.props.moveRight();
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

  }
  end() {

  }
  componentDidMount() {
    for (let i=0; i < 6; i++){
      this.props.addTree(this.generateTree());
    } 
    this.listener = document.addEventListener('keydown', this.handleKeydown.bind(this), false);
  }
  componentWillUnmount() {
    document.removeEventListener(this.listener, false);
  }
  render() {
    console.log(this.props);
    const {trees, skier} = this.props;
    return (
      <div className={StyleSheet.wrapper}
        ref="gameWrapper">
        <Skier status={skier} />
        {trees.map((tree, index) => {
          return <Tree key={`tree-${index}`} coords={tree}/>;
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Game);

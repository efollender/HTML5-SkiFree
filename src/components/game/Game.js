import React, {Component} from 'react';
import {shouldPureComponentUpdate} from 'react-pure-render';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import StyleSheet from './Game.styl';
import Skier from './Skier';
import Tree from './Tree';
import Stats from './Stats';
import Jump from './Jump';
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
    jumps: state.getIn(['game', 'jumps']),
    stats: state.getIn(['game', 'stats']),
    settings: state.getIn(['game', 'settings'])
  };
};

class Game extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
  constructor(props) {
    super(props);
    this.state = {
      keydown: false
    };
  }
  handleCollision(collision) {
  	switch (collision.type) {
  		case 'jump':
  			this.props.handleJump();
  			break;
  		case 'tree':
  			this.props.handleTree();
  			break;
  		default:
  			return false;
  	}
  	setTimeout(this.props.resetSkier, 1000);
  }
  handleKeydown(e) {
    const moving = this.props.stats.toJS().moving;
    const state = this.props.skier.toJS().state;
    let notDead = (state === 'default');
    e.preventDefault();
    switch(e.keyCode) {
      case 37:
        if (!moving && notDead) this.start();
        this.props.moveLeft();
        break;
      case 39:
        if (!moving && notDead) this.start();
        this.props.moveRight();
        break;
      case 40:
        if (notDead) {
          this.setState({keydown: true});
          this.props.moveDown();
        }
        break;
      case 13:
        this.start();
        break;
      default:
        return false;
        break;
    }
  }
  checkCollision(obj, width, height) {
  	const skier = findDOMNode(this.refs.skier).firstChild;
    const skiObj = {
      left: skier.x, 
      top: skier.y,
      right: skier.x +skier.clientWidth,
      bottom: skier.y + skier.clientHeight,
      width: skier.clientWidth,
      height: skier.clientHeight
    };
  	const obstacle = {
      left: obj.get('x'), 
      top: obj.get('y'),
      right: obj.get('x') + width,
      bottom: obj.get('y') + height,
      width: width,
      height: height
    };
    let wider = skiObj;
    let thinner = obstacle;
    if (skiObj.width < obstacle.width) {
      thinner = skiObj;
      wider = obstacle;
    }
  	const checkLeft = (obj1, obj2) => {
      return obj1.left <= obj2.left && obj2.left <= obj1.right;
    };
  	const checkRight = (obj1, obj2) => {
      return obj2.right >= obj1.left && obj2.right <= obj1.right;
    };
    const checkVertical = (obj1, obj2) => {
      return obj1.bottom <= obj2.top && obj1.bottom >= obj2.bottom;
    };
    const checkSide = (obj1, obj2) => {
      return obj1.right === obj2.left || obj1.left === obj2.right;
    };
  	const checkTop = skiObj.top === obstacle.top;
    //check for top collision
  	if (checkRight(wider, thinner) || checkLeft(wider, thinner)) {
      return checkTop ? true : false;
    }
    //check for side collision
    else if (checkVertical(skiObj, obstacle)) {
      return checkSide(skiObj, obstacle) ? true : false;
    }
  }
  generatePosition() {
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
    const settings = this.props.settings.toJS();
    const gameSpace = findDOMNode(this.refs.gameWrapper);
    const gameWidth = gameSpace.firstChild.clientWidth;
    return requestAnimFrame(() => {
      this.keyFrame = this.getAnimation();
      if (stats.moving) {
      	this.props.trees.map(tree => {
          // 11 === tree width
      		if (this.checkCollision(tree, 11, 16)) {
      			this.handleCollision({type: 'tree'});
      		}
      	});
      	this.props.jumps.map(jump => {
          // 40 === jump width
      		if(this.checkCollision(jump, 40, 9)) {
      			this.handleCollision({type: 'jump'});
      		}
      	});
        this.props.updateTrees({x: gameWidth, y: gameSpace.clientHeight});
      }
      if (this.state.keydown) {
        this.props.updateGravity(settings.gravity + 1);
      } 
    });
  }
  keyUp() {
    this.setState({keydown: false});
    this.props.updateGravity(1);
  }
  componentDidMount() {
    for (let i=0; i < 6; i++){
      this.props.addTree(this.generatePosition());
    } 
    for (let i=0; i < 3; i++){
      this.props.addJump(this.generatePosition());
    } 
    this.listener = document.addEventListener('keydown', this.handleKeydown.bind(this), false);
    this.keyUp = document.addEventListener('keyup', this.keyUp.bind(this), false);
    this.keyFrame = this.getAnimation();
  }
  componentWillUnmount() {
    document.removeEventListener(this.listener, false);
    document.removeEventListener(this.keyUp, false);
  }
  render() {
    const {trees, skier, jumps} = this.props;
    return (
      <div className={StyleSheet.wrapper}
        ref="gameWrapper">
        <Skier status={skier} ref="skier" />
        {trees.map((tree, index) => {
          return <Tree key={`tree-${index}`} coords={tree}/>;
        })}
        {jumps.map((jump, index) => {
          return <Jump key={`jump-${index}`} coords={jump}/>;
        })}
        <Stats {...this.props.stats.toJS()} />
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Game);

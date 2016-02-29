import React, {Component} from 'react';
import {shouldPureComponentUpdate} from 'react-pure-render';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {getThoughts} from '../../utils/firebaseUtils';
import StyleSheet from './Game.styl';
import Skier from './Skier';
import Tree from './Tree';
import Stats from './Stats';
import Jump from './Jump';
import * as actionCreators from '../../action_creators';
import Crafty from 'craftyjs';

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
        setTimeout(this.props.resetSkier, 1000);
  			break;
  		case 'tree':
  			this.props.handleTree();
         setTimeout(this.props.resetSkier, 2000);
  			break;
  		default:
  			return false;
  	}
  	
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
        this.setThought();
        break;
      default:
        return false;
        break;
    }
  }
  checkCollision(obj, width, height) {
    const skier = findDOMNode(this.refs.skier).firstChild;
    const x1 = skier.x;
    const w1 = skier.clientWidth;
    const x2 = obj.get('x');
    const w2 = width;
    const y1 = skier.y;
    const h1 = skier.clientHeight;
    const y2 = obj.get('y');
    const h2 = height;
                  //right skier - 1 left of left obj
    let overlap = !(((x1 + w1 - 1) < x2)  ||
                  //right obj - 1 left of left skier
                   ((x2 + w2 - 1) < x1)   ||
                  //bottom skier - 1 above top obj
                   ((y1 + h1 - 1) < y2) ||   
                  // bottom obj - 1 above top skier
                   ((y2 + h2 - 1) < y1));

    return (overlap && (
            ((y1 + h1 - 1) === y2)  || 
            ((x1 + w1 - 1) === x2)  || 
            ((x2 + w2 - 1) === x1)  ));
  }
  generatePosition() {
    const randomY = Math.floor(Math.random() * window.outerHeight);
    const randomX = Math.floor(Math.random() * window.outerWidth);
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
    return requestAnimFrame(() => {
      this.keyFrame = this.getAnimation();
      if (stats.moving) {
      	// this.props.trees.map(tree => {
       //    // 11 === tree width
      	// 	if (this.checkCollision(tree, 11, 16)) {
      	// 		this.handleCollision({type: 'tree'});
       //      this.setThought();
      	// 	}
      	// });
      	// this.props.jumps.map(jump => {
       //    // 40 === jump width
      	// 	if(this.checkCollision(jump, 40, 9)) {
      	// 		this.handleCollision({type: 'jump'});
      	// 	}
      	// });
        this.props.updateTrees({x: window.outerWidth, y: window.outerHeight});
      }
      if (this.state.keydown) {
        this.props.updateGravity(settings.gravity + 1);
      } 
    });
  }
  keyUp() {
    this.setState({keydown: false});
    this.props.updateGravity(2);
  }
  setThought() {
    let randomNum;
    if(!this.state.thoughts){
      getThoughts(thoughts => {
        randomNum = Math.floor(Math.random() * thoughts.length);
        this.setState({
          thoughts: thoughts,
          thought: thoughts[randomNum]
        });
      });
    } else {
      randomNum = Math.floor(Math.random() * this.state.thoughts.length);
      this.setState({
        thought: this.state.thoughts[randomNum]
      });
    }
      
  }
  componentDidMount() {
    for (let i=0; i < 20; i++){
      this.props.addTree(this.generatePosition());
    } 
    for (let i=0; i < 3; i++){
      this.props.addJump(this.generatePosition());
    } 
    this.listener = document.addEventListener('keydown', this.handleKeydown.bind(this), false);
    this.keyUp = document.addEventListener('keyup', this.keyUp.bind(this), false);
    this.keyFrame = this.getAnimation();
    this.setThought(); 
    const gameSpace = findDOMNode(this.refs.gameWrapper);
    this.crafty = Crafty.init(window.outerWidth, window.outerHeight, gameSpace);
  }
  componentWillUnmount() {
    document.removeEventListener(this.listener, false);
    document.removeEventListener(this.keyUp, false);
  }
  render() {
    const {trees, skier, jumps, stats} = this.props;
    const moving = stats.toJS().moving;
    const {thought} = this.state;
    return (
      <div className={StyleSheet.wrapper}
        ref="gameWrapper">
        {this.crafty &&
          <Skier status={skier} ref="skier" handleTree={this.props.handleTree} resetSkier={this.props.resetSkier} />
        }
        {trees.map((tree, index) => {
          return <Tree key={`tree-${index}`} tree={index} coords={tree}/>;
        })}
        {jumps.map((jump, index) => {
          return <Jump key={`jump-${index}`} coords={jump}/>;
        })}
        <Stats {...stats.toJS()} />
        {(thought && !moving) &&
          <div className="thought-box">{thought}</div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Game);

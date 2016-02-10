import {List, Map} from 'immutable';
import * as ui from './constants';
import * as actions from './actions';

const {
    addJump,
    addTree,
    handleJump,
    handleTree,
    moveDown,
    moveLeft,
    moveRight,
    resetSkier,
    startGame,
    updateGravity,
    updateTrees,
    INITIAL_STATE
  } = actions;

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case ui.ADD_JUMP:
      return addJump(state, action.loc);
      break;
    case ui.ADD_TREE:
      return addTree(state, action.loc);
      break;
    case ui.HANDLE_JUMP:
    	return handleJump(state);
    	break;
   	case ui.HANDLE_TREE:
   		return handleTree(state);
   		break;
    case ui.MOVE_DOWN:
      return moveDown(state);
      break;
    case ui.MOVE_LEFT:
      return moveLeft(state);
      break;
    case ui.MOVE_RIGHT:
      return moveRight(state);
      break;
    case ui.RESET_SKIER:
    	return resetSkier(state);
    	break;
    case ui.START_GAME:
      return startGame(state);
      break;
    case ui.UPDATE_GRAVITY:
      return updateGravity(state, action.gravity);
      break;
    case ui.UPDATE_TREES:
      return updateTrees(state, action.width);
      break;
  }
  return state;
}
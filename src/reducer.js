import {List, Map} from 'immutable';
import * as ui from './constants';
import * as actions from './actions';

const {
    addTree,
    moveDown,
    moveLeft,
    moveRight,
    INITIAL_STATE
  } = actions;

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case ui.ADD_TREE:
      return addTree(state, action.loc);
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
  }
  return state;
}
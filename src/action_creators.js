import * as ui from './constants';

export function addTree(coords) {
	return {
		type: ui.ADD_TREE,
		loc: coords 
	};
}

export function moveLeft() {
	return {
		type: ui.MOVE_LEFT
	};
}

export function moveRight() {
	return {
		type: ui.MOVE_RIGHT
	};
}

export function moveDown() {
	return {
		type: ui.MOVE_DOWN
	};
}

export function startGame() {
	return {
		type: ui.START_GAME
	};
}

export function updateTrees() {
	return {
		type: ui.UPDATE_TREES
	};
}
import * as ui from './constants';

export function addJump(coords) {
	return {
		type: ui.ADD_JUMP,
		loc: coords 
	};
}

export function addTree(coords) {
	return {
		type: ui.ADD_TREE,
		loc: coords 
	};
}

export function handleJump() {
	return {
		type: ui.HANDLE_JUMP
	};
}

export function handleTree() {
	return {
		type: ui.HANDLE_TREE
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

export function resetSkier() {
	return {
		type: ui.RESET_SKIER
	};
}

export function startGame() {
	return {
		type: ui.START_GAME
	};
}

export function updateGravity(gravity) {
	return {
		type: ui.UPDATE_GRAVITY,
		gravity: gravity
	};
}

export function updateTrees(gameSize) {
	return {
		type: ui.UPDATE_TREES,
		width: gameSize
	};
}
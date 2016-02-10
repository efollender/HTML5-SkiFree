import {Map, List, fromJS} from 'immutable';
import axios from 'axios';
import * as creators from './action_creators';

//util
const getX = state => {
	const direction = state.getIn(['game', 'skier', 'position']);
	switch (direction) {
		case 'right':
			return -1;
			break;
		case 'left':
			return 1;
			break;
		default:
			return 0;
			break;
	}
	return 0;
}

export const INITIAL_STATE = Map({
	game: Map({
		jumps: List(),
		monster: Map(),
		skier: Map({
			state: 'default',
			position: 'down',
			jump: Map({
				asset: 'player_jump.png',
				status: 'jump'
			}),
			dead: Map({
				asset: 'player_dead.png',
				status: 'dead'
			}),
			default: Map({
				asset: 'player_down.png',
				status: 'default'
			})
		}),
		trees: List(),
		stats: Map({
			points: 0,
			moving: false,
			clock: Date.now()
		}),
		settings: Map({
			gravity: -9.8
		})
	})
});

export function addTree(state, pos) {
	return state.updateIn(['game','trees'], oldTrees => {
		return oldTrees.push(fromJS({
			x: pos.randomX,
			y: pos.randomY
		}));
	});
}

export function addJump(state, pos) {
	return state.updateIn(['game','jumps'], oldJumps => {
		return oldJumps.push(fromJS({
			x: pos.randomX,
			y: pos.randomY
		}));
	});
}

export function moveLeft(state) {
	return state.updateIn(['game', 'skier', 'position'], oldPosition => {
		return 'left';
	});
}

export function moveRight(state) {
	return state.updateIn(['game', 'skier', 'position'], oldPosition => {
		return 'right';
	});
}

export function moveDown(state) {
	return state.updateIn(['game', 'skier', 'position'], oldPosition => {
		return 'down';
	});
}

export function startGame(state) {
	return state.updateIn(['game', 'stats'], oldStats => {
		return oldStats.merge(fromJS({
			moving: !oldStats.get('moving'),
			clock: Date.now()
		}));
	});
}

export function updateTrees(state) {
	const xFactor = getX(state);
	const trees = state.updateIn(['game', 'trees'], oldTrees => {
		return oldTrees.map(tree => {
			return Map({
				x: tree.get('x') + xFactor,
				y: tree.get('y') - 1
			});
		});
	});
	const jumps = trees.updateIn(['game', 'jumps'], oldJumps => {
		return oldJumps.map(jump => {
			return Map({
				x: jump.get('x') + xFactor,
				y: jump.get('y') - 1
			});
		});
	});
	return state.merge(jumps);
}
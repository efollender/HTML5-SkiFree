import {Map, List, fromJS} from 'immutable';
import axios from 'axios';
import * as creators from './action_creators';

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
			points: 0
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
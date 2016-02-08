import {Map, List, fromJS} from 'immutable';
import axios from 'axios';
import * as creators from './action_creators';


export const INITIAL_STATE = Map({
	game: Map({
		jumps: List(),
		monster: Map(),
		skier: Map(),
		trees: List(),
		stats: Map({
			points: 0
		}),
		settings: Map({
			gravity: -9.8
		})
	})
});
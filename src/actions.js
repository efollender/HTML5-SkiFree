import {Map, List, fromJS} from 'immutable';
import axios from 'axios';
import * as creators from './action_creators';


export const INITIAL_STATE = Map({
	jumps: List(),
	monster: Map(),
	skier: Map(),
	trees: List(),
	stats: Map()
});
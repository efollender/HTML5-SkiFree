import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import {setState} from './action_creators';

const createStoreWithMiddleware = applyMiddleware(
	thunk
	)(createStore);

export const store = createStore(reducer);


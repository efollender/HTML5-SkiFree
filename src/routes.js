import React from 'react';
import {Route, Router, hashHistory} from 'react-router';
import App from './components/App';
import Game from './components/game/Game';

export default (
<Router history={hashHistory}>
	<Route component={App}>
		<Route component={Game} path="/" />
	</Route>
</Router>
);
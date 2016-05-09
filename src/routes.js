import React from 'react';
import {Route, Router, hashHistory} from 'react-router';
import App from './components/App';
import Game from './components/game/Game';
import Portfolio from './components/portfolio/Portfolio';

export default (
<Router history={hashHistory}>
	<Route component={App}>
		<Route component={Game} path="/" />
		<Route component={Portfolio} path="/portfolio"/>
	</Route>
</Router>
);
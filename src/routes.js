import React from 'react';
import {Route, Router, browserHistory} from 'react-router';
import App from './components/App';
import Game from './components/game/Game';
import Portfolio from './components/portfolio/Portfolio';
import GameIntro from './components/game/GameIntro';

export default (
<Router history={browserHistory}>
	<Route component={App}>
		<Route component={GameIntro} path="/"/>
		<Route component={Game} path="/skifree"/>
		<Route component={Portfolio} path="/portfolio"/>
	</Route>
</Router>
);
import React from 'react';
import {Route, Router, hashHistory} from 'react-router';
import App from './components/App';

export default (
<Router history={hashHistory}>
	<Route component={App} path="/">
	</Route>
</Router>
);
import React, {Component} from 'react';
import {List, Map} from 'immutable';
import StyleSheet from './App.styl';

export default class App extends Component {
	
	render() {
		return (
			<div className={StyleSheet.wrapper}>
					{this.props.children}
			</div>
		);
	}
}

import React, {Component} from 'react';
import {List, Map} from 'immutable';
import StyleSheet from './Game.styl';

export default class Game extends Component {
	handleCollision() {

	}
	handleKeydown(e) {

	}
	handleJump() {

	}
	start() {

	}
	end() {

	}
	render() {
		return (
			<div className={StyleSheet.wrapper}>
					<Skier coords={this.props.skier.coords} />
			</div>
		);
	}
}

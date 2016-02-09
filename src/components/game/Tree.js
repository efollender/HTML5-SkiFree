import React, {Component} from 'react';
import {toJS} from 'immutable';
import StyleSheet from './Game.styl';

export default class Tree extends Component {
	render() {
		const coords = this.props.coords.toJS();
		const styles = {
			top: coords.y,
			left: coords.x
		};
		return (
			<div className={StyleSheet.Tree} style={styles}>
				<img src='../assets/tree.png'/>
			</div>
		);
	}
}
import React, {Component, PropTypes} from 'react';
import {toJS} from 'immutable';
import StyleSheet from './Game.styl';

export default class Tree extends Component {
	static propTypes = {
		coords: PropTypes.object
	};
	render() {
		const coords = this.props.coords.toJS();
		const styles = {
			top: coords.y,
			left: coords.x
		};
		return (
			<div className={StyleSheet.Tree} style={styles}>
				<img src='assets/tree.png'/>
			</div>
		);
	}
}
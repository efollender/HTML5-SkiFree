import React, {Component, PropTypes} from 'react';
import {toJS} from 'immutable';
import {findDOMNode} from 'react-dom';
import StyleSheet from './Game.styl';
import Crafty from 'craftyjs';

export default class Tree extends Component {
	static propTypes = {
		coords: PropTypes.object
	};
	crafty() {
		const coords = this.props.coords.toJS();

		this.el = Crafty.e(`Tree, 2D, DOM, Image`)
							.attr({
								x: coords.x, 
								y: coords.y, 
								w: 11, 
								h: 16})
							.DOM(findDOMNode(this.refs[this.props.tree]))
							.image("assets/tree.png");
	}
	componentDidMount() {
		this.crafty();
	}
	render() {
		const coords = this.props.coords.toJS();
		const styles = {
			top: coords.y,
			left: coords.x
		};
		if (this.el) {
			this.el.x = coords.x;
			this.el.y = coords.y;
		}
		return (
			<div className={StyleSheet.tree} ref={this.props.tree} />
		);
	}
}
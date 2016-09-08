import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import ReactTransitionGroup from 'react-addons-transition-group';
import StyleSheet from './Game.styl';

export default class GameIntro extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fadeOut: false
		};
	}
	componentWillLeave(cb) {
		this.setState({
			fadeOut: !this.state.fadeOut
		});
		setTimeout(cb, 1000);
	}
	render() {
		return (
				<div className={classNames([StyleSheet.gameIntro], {
					fadeOut: this.state.fadeOut
				})}>
					<div className="intro-wrapper">
						<span>Do you want to play a game?</span>
						<Link to="skifree">Yes</Link>
					</div>
				</div>
		);
	}
}
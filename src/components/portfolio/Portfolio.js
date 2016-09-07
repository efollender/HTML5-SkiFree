import React, {Component} from 'react';
import {shouldPureComponentUpdate} from 'react-pure-render';
import {List, Map} from 'immutable';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import * as actionCreators from '../../action_creators';
import StyleSheet from './portfolio.styl';
const portfolio = require('../../assets/portfolio.json');

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typed: '',
      string: '',
      portfolio: portfolio
    };
  }
  isTyped(project) {
    return this.state.string === project;
  }
  setString(string) {
    this.setState({
      string: string,
      typed: ''
    });
    setTimeout(this.type.bind(this), 50);
  }
  type() {
    const {typed, string, typing} = this.state;
    if(typed.length < string.length) {
      const nextType = string.substr(0, typed.length + 1);
      this.setState({
        typed: nextType
      });
      setTimeout(this.type.bind(this), 100);
    }
  }
  erase() {
    const {typed} = this.state;
    if(typed.length > 0) {
      const nextType = typed.substr(0, typed.length - 1);
      this.setState({
        typed: nextType
      });
      setTimeout(this.erase.bind(this), 100);
    }
  }
  render() {
    const {
      portfolio,
      typed,
      string
    } = this.state;
    return (
      <div className={StyleSheet.wrapper}>
        {portfolio.projects.map((project,index) => {
          if (this.isTyped(project.title)) return false;
          return (
            <p key={`project-${index}`}
              onClick={() => this.setString(project.title)}>
              {project.title}
            </p>
          )
        })}
        <div className={classNames(['type-string'], {
          typing: typed === string
        })}>
          {typed}
          <span className="cursor"/>
        </div>
      </div>
    );
  }
}
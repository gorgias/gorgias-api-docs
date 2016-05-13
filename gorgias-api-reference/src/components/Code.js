import React from 'react';
import ReactDOM from 'react-dom';
import highlightJs from 'highlight.js';
import { isEqual, omit, extend } from 'underscore';

export default class Code extends React.Component {

  constructor(properties) {
    super(properties);
    this.childProperties = omit(properties, 'style');
  }

  componentDidMount() {
    highlightJs.highlightBlock(ReactDOM.findDOMNode(this));
  }

  componentWillReceiveProps(properties) {
    this.childProperties = omit(properties, 'style');
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value === this.props.value && isEqual(nextProps.style, this.props.style)) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    highlightJs.highlightBlock(ReactDOM.findDOMNode(this));
  }

  render() {
    return (<pre {...this.childProperties}>
        <code>
          { this.props.value }
        </code>
      </pre>);
  }
}


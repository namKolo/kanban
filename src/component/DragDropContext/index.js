// @flow
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

type Props = {
  children: React$Node
};

class DragDropContextWrapper extends Component<Props> {
  render() {
    return this.props.children;
  }
}

export default DragDropContext(HTML5Backend)(DragDropContextWrapper);

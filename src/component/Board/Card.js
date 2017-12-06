// @flow
import flow from 'lodash/flow';
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import type {
  ConnectDragSource,
  ConnectDropTarget,
  DragSourceSpec,
  DropTargetSpec
} from 'react-dnd';

import ItemTypes from './ItemTypes';
import type { DraggableId, DroppableId } from '../../types';

type DropTargetInjectedProps = {
  connectDropTarget: ConnectDropTarget
};

type DragSourceInjectedProps = {
  connectDragSource: ConnectDragSource,
  isDragging: boolean
};

type ComponentProps = {
  id: string,
  text: string,
  order: number,
  style?: Object,
  onItemDragHover: (draggedId: DraggableId, droppedId: DroppableId) => void
};

type ProvidedProps = DropTargetInjectedProps & DragSourceInjectedProps;
type Props = ProvidedProps & ComponentProps;

const cardSource: DragSourceSpec<ComponentProps> = {
  beginDrag(props) {
    return {
      id: props.id,
      order: props.order
    };
  }
};

const cardTarget: DropTargetSpec<ComponentProps> = {
  hover(props, monitor, component) {
    const dragId = monitor.getItem().id;
    const hoverId = props.id;
    const dragOrder = monitor.getItem().order;
    const hoverOrder = props.order;

    if (dragId === hoverId) {
      return;
    }

    const node = findDOMNode(component);
    if (!node || node instanceof Text) {
      return;
    }

    const hoverBoundingRect = node.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragOrder < hoverOrder && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragOrder > hoverOrder && hoverClientY > hoverMiddleY) {
      return;
    }

    props.onItemDragHover(dragId, hoverId);
  }
};

const dropTargetHoc = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}));

const dragSourceHoc = DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}));

class Card extends Component<Props> {
  node: ?HTMLElement;

  render() {
    const { style, text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    const zIndex = isDragging ? 2 : 1;
    // $FlowFixMe
    return connectDragSource(
      // $FlowFixMe
      connectDropTarget(
        <div className="Card" style={{ zIndex, opacity, ...style }}>
          {/*  $FlowFixMe */}
          {text}
          <br />
        </div>
      )
    );
  }
}
const hoc = flow(dropTargetHoc, dragSourceHoc);
const ExportedComponent: ComponentType<ComponentProps> = hoc(Card);
export default ExportedComponent;

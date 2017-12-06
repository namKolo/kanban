// @flow
import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import type { Card as CardType, DraggableId, DroppableId } from '../../types';

import Card from './Card';

type Props = {
  cards: CardType[],
  onItemDragHover: (draggedId: DraggableId, droppedId: DroppableId) => void
};

export default class Board extends Component<Props> {
  handleItemDragHover = (draggedId: DraggableId, hoverId: DroppableId) => {
    this.props.onItemDragHover(draggedId, hoverId);
  };

  render() {
    const { cards } = this.props;

    return (
      <div style={{ width: 300, margin: '20px auto', position: 'relative' }}>
        {cards.map((card, index) => (
          <Motion
            key={index}
            style={{ y: spring(card.order * 80, { stiffness: 500, damping: 32 }) }}
          >
            {({ y }) => (
              <Card
                id={card.id}
                order={card.order}
                text={card.text}
                onItemDragHover={this.handleItemDragHover}
                style={{
                  transform: 'translate3d(0, ' + y + 'px, 0)'
                }}
              />
            )}
          </Motion>
        ))}
      </div>
    );
  }
}

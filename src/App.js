// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import DragDropContext from './component/DragDropContext';
import Board from './component/Board';
import { loadCards, moveCards } from './store/action-creator';
import type { Card, State, DroppableId, DraggableId } from './types';

type ConnectInjectedProps = {
  cards: Card[],
  loadCards: typeof loadCards,
  moveCards: typeof moveCards
};

type Props = ConnectInjectedProps & {};

class App extends Component<Props> {
  componentDidMount() {
    this.props.loadCards();
  }

  handleItemDragHover = (hoverId: DroppableId, draggedId: DraggableId) => {
    this.props.moveCards(hoverId, draggedId);
  };

  render() {
    const { cards } = this.props;
    return (
      <div className="App">
        <DragDropContext>
          <Board {...{ cards, onItemDragHover: this.handleItemDragHover }} />
        </DragDropContext>
      </div>
    );
  }
}

const hoc = connect(
  (state: State) => ({
    cards: state.cards
  }),
  { loadCards, moveCards }
);

export default hoc(App);

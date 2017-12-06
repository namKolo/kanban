// @flow
import update from 'immutability-helper';

import type { State, Action } from '../types';
import { cards } from './fake-data';

const getInitialState = () => ({
  cards: []
});

export default (state: State = getInitialState(), action: Action): State => {
  if (action.type === 'LOAD_CARD_COLLECTION') {
    return {
      cards
    };
  }

  if (action.type === 'MOVE_CARD') {
    const { cards } = state;
    const { draggedId, hoverId } = action.payload;

    const dragIndex = cards.findIndex(el => el.id === draggedId);
    const hoverIndex = cards.findIndex(el => el.id === hoverId);
    const dragCardOrder = cards[dragIndex].order;
    const hoverCardOrder = cards[hoverIndex].order;

    return update(state, {
      cards: {
        [dragIndex]: { order: { $set: hoverCardOrder } },
        [hoverIndex]: { order: { $set: dragCardOrder } }
      }
    });
  }

  return state;
};

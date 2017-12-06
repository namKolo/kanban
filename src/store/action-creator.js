// @flow

import type { DraggableId, DroppableId } from '../types';

export type LoadCardCollectionAction = {|
  type: 'LOAD_CARD_COLLECTION'
|};

export type ReorderCardAction = {|
  type: 'REORDER_CARD',
  payload: {|
    droppedId: DroppableId,
    draggedId: DraggableId
  |}
|};

export type MoveCardAction = {|
  type: 'MOVE_CARD',
  payload: {|
    hoverId: DroppableId,
    draggedId: DraggableId
  |}
|};

export const loadCards = (): LoadCardCollectionAction => ({
  type: 'LOAD_CARD_COLLECTION'
});

export const reorderCards = (
  droppedId: DroppableId,
  draggedId: DraggableId
): ReorderCardAction => ({
  type: 'REORDER_CARD',
  payload: {
    droppedId,
    draggedId
  }
});

export const moveCards = (hoverId: DroppableId, draggedId: DraggableId): MoveCardAction => ({
  type: 'MOVE_CARD',
  payload: {
    hoverId,
    draggedId
  }
});

export type Action = LoadCardCollectionAction | ReorderCardAction | MoveCardAction;

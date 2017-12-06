// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { Action as ActionCreators } from './store/action-creator';

export type Id = string;
export type CardId = Id;
export type DraggableId = Id;
export type DroppableId = Id;
export type TypeId = Id;

export type Card = {
  id: CardId,
  text: string,
  order: number
};

export type State = {
  cards: Card[]
};

export type Action = ActionCreators;
export type Dispatch = ReduxDispatch<Action>;
export type Store = ReduxStore<State, Action, Dispatch>;

/**
 * Steps to create reducer
 * 1. Initial State
 * 2. Actions
 * 3. Reducer
 * 4. Store
 *
 *
 * operator object
 * [kiri] = [kanan]
 * [teknik destructuring object] = [ teknik spread object]
 * [...rest] = [...spread]
 *
 */

import uniqid from 'uniqid';
import { createStore } from "redux";

export const rate = 1000;

/**
 * Guest {
 *  id,
 *  name,
 *  email,
 *  phone,
 *  address
 * }
 *
 * Transaction {
 *  id,
 *  guestId,
 *  payment,
 *  checkInDay,
 *  checkOutDay
 * }
 */

const initialState = {
  guests: [
    {
      id: uniqid(),
      name: 'John Thor',
      phone: '12345',
      email: 'john.thor@email.com',
      address: 'Jakarta'
    },
    {
      id: uniqid(),
      name: 'Moon Young',
      phone: '23456',
      email: 'moon.young@email.com',
      address: 'Bandung'
    }

  ],
  transactions: []
};

export const GUEST_ACTIONS = {
  CHECK_IN: 'CHECK_IN',
  CHECK_OUT: 'CHECK_OUT',
  CREATE_GUEST: 'CREATE_GUEST',
  UPDATE_GUEST: 'UPDATE_GUEST',
  DELETE_GUEST: 'DELETE_GUEST'
};

function guestReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GUEST_ACTIONS.CHECK_IN:
      /**
      * Transaction {
      *  id,
      *  guestId,
      *  payment,
      *  checkInDay,
      *  checkOutDay
      * }
      */
      return { transactions: [ ...state.transactions, payload ], guests: [ ...state.guests ] };
    case GUEST_ACTIONS.CHECK_OUT:
      return { transactions: state.transactions.map((trx) => {
        if (trx.id === payload.id && trx.guestId === payload.guestId) {
          return {
            ...trx,
            checkOutDay: payload.checkOutDay,
            payment: (payload.checkOutDay - trx.checkInDay) * rate,
          };
        }

        return trx;
      }), guests: [ ...state.guests ] };
    case GUEST_ACTIONS.CREATE_GUEST:
      // membuat object state baru dari state yang sebelumnya (parameter state)
      return { guests: [ ...state.guests, payload ], transactions: [ ...state.transactions ] };
    case GUEST_ACTIONS.UPDATE_GUEST:
      return { guests: state.guests.map((guest) => {
        if (guest.id === payload?.id) {
          return { ...guest, ...payload };
        }

        return guest;
      }), transactions: [ ...state.transactions ]};
    case GUEST_ACTIONS.DELETE_GUEST:
      // payload bisa berarti index atau id (guest).
      // [].splice
      // [].filter

      return {
        // data yang masuk ke property guests, adalah guest yang tidak dihapus.
        guests: state.guests.filter((guest) => payload !== guest.id),
        transactions: [ ...state.transactions ]
      };
    default:
      return state;
  }
}

export const guestStore = createStore(guestReducer);

/**
 * payload = 1 (guest ID)
 * guests = [ 1, 2, 3, 4, 5]
 *
 * guests.filter((guest) => payload !== guest)
 * ketika:
 *  payload = 1 [!==] guest = 1, maka kondisinya bernilai false
 *  payload = 1 [!==] guest = 2, maka kondisinya bernilai true
 *  payload = 1 [!==] guest = 3, maka kondisinya bernilai true
 *  payload = 1 [!==] guest = 4, maka kondisinya bernilai true
 *  payload = 1 [!==] guest = 5, maka kondisinya bernilai true
 *
 * guests = [ 2, 3, 4, 5 ]
 */

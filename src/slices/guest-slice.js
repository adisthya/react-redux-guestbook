import uniqid from 'uniqid';
import { createSlice } from '@reduxjs/toolkit';

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

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    checkIn: (state, action) => {
      state.transactions.push(action.payload);
    },
    checkOut: (state, action) => {
      state.transactions = state.transactions.map(trx => {
        if (trx.id === action.payload.id) {
          return { ...trx, ...action.payload };
        }

        return trx;
      });
    },
    createGuest: (state, action) => {
      state.guests.push(action.payload);
    },
    updateGuest: (state, action) => {
      state.guests = state.guests.map(guest => {
        if (guest.id === action.payload.id) {
          return { ...guest, ...action.payload };
        }

        return guest;
      });
    },
    deleteGuest: (state, action) => {
      state.guests = state.guests.filter(guest => guest.id !== action.payload);
    }
  }
});

export const rate = 2000;
export const guestSelector = (storedState) => storedState.guest;
export const { checkIn, checkOut, createGuest, updateGuest, deleteGuest } = guestSlice.actions;
export default guestSlice.reducer;

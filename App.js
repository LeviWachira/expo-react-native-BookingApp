import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import BookingNavigator from './navigator/BookingNavigator';
import roomsReducer from './store/reducer/rooms';
import bookingReducer from './store/reducer/booking';

export default function App() {

  const rootReducer = combineReducers({
    rooms: roomsReducer,
    booking: bookingReducer
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store} >
      <BookingNavigator />
    </Provider>
  );
}


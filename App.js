import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';


import BookingNavigator from './navigator/BookingNavigator';
import roomsReducer from './store/reducer/rooms';

export default function App() {

  const rootReducer = combineReducers({
    rooms: roomsReducer
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store} >
      <BookingNavigator />
    </Provider>
  );
}


import { Slot } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import { ScrollView } from 'react-native';

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
);
}
import { Slot } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default function HomeLayout() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor:'white'}}
    >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Provider store={store}>
      <Slot />
    </Provider>
    </ScrollView>
    </KeyboardAvoidingView>
);
}
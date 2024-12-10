import React from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import { Slot } from 'expo-router';
import { Loading } from '../components/loading';

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <Loading />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Slot />
        </ScrollView>
      </KeyboardAvoidingView>
    </Provider>
  );
}

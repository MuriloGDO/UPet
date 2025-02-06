import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import { Slot, SplashScreen } from 'expo-router';
import { Loading } from '../components/loading';

SplashScreen.preventAutoHideAsync();

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

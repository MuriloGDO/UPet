import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { institutionStyles } from './styles/institution';
import { Footer } from '../components/footer';
import { ChatCard } from '../components/chatCard';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <View style={{ marginTop: 80 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ fontSize: 30, maxWidth: 250 }}>Chats</Text>
        </View>

        <View style={institutionStyles.hr} />

        <ScrollView style={styles.scrollContainer}>
          <ChatCard/>
          <ChatCard/>
          <ChatCard/>

        </ScrollView>
      </View>
      <Footer></Footer>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    maxHeight: 700,
    marginHorizontal: 10, 
  },
});

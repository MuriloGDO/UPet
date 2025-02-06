import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { institutionStyles } from './styles/institution';
import { Footer } from '../components/footer';
import { ChatCard } from '../components/chatCard';
import { systemApiService } from '../api/api';
import { RootState } from '../redux/store';
import { setLoading } from '../redux/slices/uiSlice';

SplashScreen.preventAutoHideAsync();

interface Chat{
  id: string,
  institution: number
  name: string
  user: number
}

export default function App() {
  const [chats, setChats] = useState<Chat[]>([])

  const userId = useSelector((state: RootState) => state.userInfo.id);
  const instId = useSelector((state: RootState) => state.institutionInfo.id);

  const userType = useSelector((state: RootState) => state.userInfo.user_type);

  const router = useRouter();
  const dispatch = useDispatch();


  const getChats = async()=>{
    dispatch(setLoading(true))
    const response = await systemApiService.listChats(instId, userId)
    setChats(response)
    dispatch(setLoading(false))
  }

  useEffect(()=>{
    getChats()
  }, [])

  return (
    <>
      <View style={{ marginTop: 80 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ fontSize: 30, maxWidth: 250 }}>Chats</Text>
        </View>

        <View style={institutionStyles.hr} />

        <ScrollView style={styles.scrollContainer}>
          {chats.map((chat) => (
            <TouchableOpacity
                key={chat.name}
                onPress={
                  ()=>router.push({
                    pathname: `/${chat.name}/chat`,
                    params: {
                      user_id: chat.user,
                      inst_id: chat.institution,
                    },
                  })
                  }
            >
              <ChatCard name={userType ? `Instituição ${chat.institution}` : `Usuário ${chat.user}`}/>
            </TouchableOpacity>
          )) }
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

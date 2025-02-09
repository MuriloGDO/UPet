import { StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { systemApiService } from '../../api/api';
import { setLoading } from '../../redux/slices/uiSlice';
import { RootState } from '../../redux/store';
import { sharedStyles } from '../styles/sharedStyle';

interface IMessage{
    content: string
    id: number | null
    pet: null | number
    timestamp: string
    user: null | number
}

export default function ChatScreen() {
  const { id, user_id, pet_id, institution_name, user_name } = useLocalSearchParams();   
  const WS_URL = `ws://98.81.110.30:80/ws/chat/${id}/`;
  const dispatch = useDispatch();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  const userType = useSelector((state: RootState) => state.userInfo.user_type);
  

  const getChatHistory = async () => {
    dispatch(setLoading(true));
    try {
      const response = await systemApiService.getChatHistory(id);
      setMessages(response); 
    } catch (error) {
      Alert.alert('Erro ao buscar histórico');
    }
    dispatch(setLoading(false));
  };

  const adoptPet = async () => {
    dispatch(setLoading(true))
    await systemApiService.adoptPet(user_id, pet_id)
    dispatch(setLoading(false))
    router.push('/chats')
  }

  useEffect(() => {
    getChatHistory();
    const socket = new WebSocket(WS_URL);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newMessage : IMessage = {
        content: data.message,
        id: null,
        pet: data.institution ? 1 : 0,
        timestamp: "",
        user: data.user ? 1 : 0
      }
      setMessages((prev) => [...prev, newMessage]);
    };
    setWs(socket);
    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (ws && input.trim()) {
      ws.send(JSON.stringify({
        message: input,
        user_id: userType ? user_id : null,
        pet_id: userType ? null : pet_id, 
      }));
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
        <TouchableOpacity onPress={()=> router.push('/chats')}>
          <Text style={{marginLeft:15, fontSize:18, marginBottom:5}}>{"< Voltar"}</Text>
        </TouchableOpacity>
        {
          !userType
          ?
          <TouchableOpacity style={{padding:5, backgroundColor:"#02778E", justifyContent:'center', alignItems:'center', borderRadius:20}} onPress={()=> adoptPet()}>
            <Text style={{fontSize:18,color:"white", alignSelf:'center'}}>Adotado</Text>
          </TouchableOpacity>
          :
          undefined
        }
      </View>
      <View style={{justifyContent:"center", alignItems:"center", marginBottom:10}}>
        <Text style={{fontSize:20}}>{userType ? institution_name : user_name}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages ? messages.map((msg, index) => (
          <View key={index} style={[styles.message, { backgroundColor: userType ? msg.user ? 'green' : 'gray' : msg.user ? 'gray' : 'green'}]}>
            {
                userType ?
                <Text style={styles.user}>{msg.pet ? institution_name : 'Voce'}:</Text>
                :
                <Text style={styles.user}>{msg.pet ? 'Voce' : user_name}:</Text>
            }
            <Text style={styles.text}>{msg.content}</Text>
          </View>
        )) : undefined}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor:'white'
  },
  chatContainer: {
    flexGrow: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  user: {
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#333',
  },
  input: {
    flex: 1,
    backgroundColor: '#444',
    color: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#2575fc',
    padding: 10,
    borderRadius: 8,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


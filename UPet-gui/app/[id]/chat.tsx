import { StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { systemApiService } from '../../api/api';
import { setLoading } from '../../redux/slices/uiSlice';
import { RootState } from '../../redux/store';

interface IMessage{
    content: string
    id: number | null
    pet: null | number
    timestamp: string
    user: null | number
}

export default function ChatScreen() {
  const { id, user_id, pet_id, institution_name, user_name } = useLocalSearchParams();   
  const WS_URL = `ws://127.0.0.1:8000/ws/chat/${id}/`;
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
      <TouchableOpacity onPress={()=> router.push('/chats')}>
        <Text style={{marginLeft:15, fontSize:18, marginBottom:5}}>{"< Voltar"}</Text>
      </TouchableOpacity>
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


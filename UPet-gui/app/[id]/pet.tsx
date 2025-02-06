import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { PetCard } from '../../components/petCard';
import { LinearGradient } from 'expo-linear-gradient';
import { systemApiService } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/uiSlice';

export default function App() {
  const { id } = useLocalSearchParams();
  const petsResponse = useSelector((state: RootState) => state.petsSlice.pets);
  const user_id = useSelector((state: RootState) => state.userInfo.id);

  const dispatch = useDispatch()

  const pet = petsResponse.find((pet) => String(pet.id) === id);

  const router = useRouter()

  return (
    <ScrollView 
      style={{
        flex: 1,
        marginTop: 80,
      }}
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <TouchableOpacity style={{marginLeft:30, alignSelf:'flex-start'}} onPress={()=>{router.push('/home')}}>
        <Text style={{fontSize:19, marginBottom:30}}>{'<'} Back</Text>
      </TouchableOpacity>
      <PetCard 
        marginRight={0}
        width={350} 
        percentage={pet?.percentage} 
        name={pet?.name} 
        image={pet?.photos[0]?.photo} 
      />
      <Text style={{ marginTop: 10, marginBottom: 30, fontSize: 22, fontWeight: '600' }}>Descrição:</Text>
      <View style={styles.shadowContainer}>
        <View style={styles.textWrapper}>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.text}>
              {pet?.description}
            </Text>
          </ScrollView>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', 'white']}
            style={styles.gradient}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={{
          backgroundColor: 'black',
          width: 200,
          height: 40,
          borderRadius: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={async ()=>{
          dispatch(setLoading(true))
          await systemApiService.createChat(pet?.institution?.id, user_id, pet?.id)
          router.push('/chats')
        }}
      >
        <Text style={{ color: 'white', fontWeight:600 }}>Entre em contato</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    margin: 10,
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 4,
  },
  textWrapper: {
    maxHeight: 150,
    overflow: 'hidden', 
    position: 'relative',
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  text: {
    maxWidth: '100%',
    textAlign: 'justify',
    fontSize: 15,
    marginBottom:40
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, 
  },
});

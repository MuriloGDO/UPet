import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    buttonStyle: {
      borderRadius:30,
      marginTop:30,
      marginBottom:30,
      height:30,
      width:90,
      backgroundColor:'#02778E',
      color:'white',
      justifyContent:'center',
      alignItems:'center',
      // Sombra para iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      // Sombra para Android
      elevation: 5,
    },
    container: {
      flex: 1,
      alignItems: 'center',
    },
    textContainer: {
      marginTop: 20,
      marginBottom: 30,
      alignItems: 'center',
    },
    logoStyle: {
      marginTop: 110,
    },
    uPetText: {
      fontSize: 42,
      color: 'white',
    },
    descriptionText: {
      fontSize: 12,
      color: 'white',
      textAlign: 'center',
      marginTop: 8,
    },
    input: {
      height: 40,
      width: 300,
      borderColor: 'black',
      backgroundColor: 'white',
      borderWidth: 0.7,
      marginTop: 16,
      borderRadius: 50,
      textAlign: 'center',
      // Sombra para iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      // Sombra para Android
      elevation: 5,
    },
  });
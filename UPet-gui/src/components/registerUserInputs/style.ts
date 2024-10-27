import { StyleSheet } from "react-native";

export const userRegisterStyles = StyleSheet.create({
    input: {
      height: 30,
      width: 300,
      borderColor: 'black',
      backgroundColor: 'white',
      borderWidth: 0.7,
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
    text: {
      alignSelf:'flex-start',
      marginTop: 10,

    }
  });
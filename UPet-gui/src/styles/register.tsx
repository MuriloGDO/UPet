import { StyleSheet } from "react-native";

export const registerStyles = StyleSheet.create({
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
      marginTop: 120,
      width:80,
      height:80
    },
    uPetText: {
      fontSize: 22,
      color: 'white',
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
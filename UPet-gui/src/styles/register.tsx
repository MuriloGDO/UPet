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
      marginTop: 70,
      width:80,
      height:80
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
    buttonsContainer:{
      flexDirection:'row',
      marginTop:0,
      justifyContent:'center',
      width:'100%'
    },
    buttonStyle: {
      borderRadius:30,
      marginTop:10,
      marginBottom:30,
      height:30,
      width:130,
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
    blue:{
      backgroundColor:'#02778E',
    },
    red:{
      backgroundColor:'red',
      marginRight:20
    }
  });
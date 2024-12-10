import { useRouter } from "expo-router"
import React from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"

export const Footer = () =>{
    const router = useRouter()
    return(
        <View style={styles.footer}>
            <TouchableOpacity onPress={()=> router.push('/home')}>
                <Image style={styles.images} source={require('../../assets/botao-de-inicio.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push('/')}>
                <Image style={styles.images} source={require('../../assets/gostar.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push('/')}>
                <Image style={styles.images} source={require('../../assets/mail.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push('/userProfile')}>
                <Image style={styles.images} source={require('../../assets/do-utilizador.png')} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
      position: "absolute",
      bottom:0,
      justifyContent: 'space-around',
      height: 100,
      width:'100%',
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      padding: 10
    },
    images: {
        width:30,
        height:30
    }
  });
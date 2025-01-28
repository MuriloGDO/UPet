import { useRouter } from "expo-router"
import React from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import { setUserType } from "../../redux/slices/userInfoSlice"
import { setInstType } from "../../redux/slices/institutionInfoSlice"

export const Footer = () =>{
    const router = useRouter()
    const userType = useSelector((state: RootState) => state.userInfo.user_type)
    const instituionType = useSelector((state: RootState) => state.institutionInfo.user_type)

    const dispatch = useDispatch()

    return(
        <View style={styles.footer}>
            <TouchableOpacity onPress={()=> {userType ? router.push('/home') : instituionType ?  router.push('/institutionPage') : undefined}}>
                <Image style={styles.images} source={require('../../assets/botao-de-inicio.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push('/chats')}>
                <Image style={styles.images} source={require('../../assets/mail.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push('/userProfile')}>
                <Image style={styles.images} source={require('../../assets/do-utilizador.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {
                    router.push('/')
                    dispatch(setUserType(''))
                    dispatch(setInstType(''))
                }}>
                <Image style={styles.images} source={require('../../assets/sair.png')} />
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
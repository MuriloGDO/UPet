import React from "react"
import { ImageBackground, View, StyleSheet, Text, Image } from "react-native"

export const PetCard = (props: {name?:string, localizacao?:string, image?:string}) =>{
    return (
        
          <View style={styles.content}>
            <ImageBackground
                source={props.image ? { uri: `data:image/jpeg;base64,${props.image}` } : require('../../assets/golden.jpg.webp')}
                style={styles.background}
                >
                <View style={styles.text}>
                    <Text style={{color:'white', fontSize:16, fontWeight:600, marginBottom:3}}>Gaia</Text>
                    <View style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
                        <Image style={{width:10, height:10, marginRight:5}} source={require('../../assets/pin.png')}/>
                        <Text style={{color:'white'}}>BH, Belo Horizonte</Text>
                    </View>
                </View>
            </ImageBackground>
            
          </View>
      );
    }
    
    const styles = StyleSheet.create({
        background: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          borderRadius: 30,
          width: 300,
          height: 450,
          display: 'flex',
          overflow: 'hidden',
          marginRight:30
        },
        text: {
          width: 200,
          height: 70,
          backgroundColor: 'rgba(128, 128, 128, 0.8)',
          borderRadius: 10,
          padding: 10,
          position: 'absolute', 
          bottom: 20, 
          alignSelf: 'center', 
        },
      });
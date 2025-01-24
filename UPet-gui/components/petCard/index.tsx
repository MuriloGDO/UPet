import React from "react"
import { ImageBackground, View, StyleSheet, Text, Image } from "react-native"

export const PetCard = (props: {name?:string, percentage?:number, image?:string, width?:number, marginRight?: number}) =>{
    return (
        
          <View style={[styles.content,{width: props.width?props.width:300, marginRight: props.marginRight==0?props.marginRight:30}]}>
            <ImageBackground
                source={props.image ? { uri: `data:image/jpeg;base64,${props.image}` } : require('../../assets/golden.jpg.webp')}
                style={styles.background}
                >
                <View style={styles.text}>
                    <Text style={{color:'white', fontSize:16, fontWeight:600, marginBottom:3}}>{props.name}</Text>
                    <View style={{display:'flex', flexDirection:'row', alignItems:"center"}}>
                        {/* <Image style={{width:10, height:10, marginRight:5}} source={require('../../assets/pin.png')}/> */}
                        <Text style={{color:'white'}}>Match: {props.percentage}%</Text>
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
          height: 450,
          display: 'flex',
          overflow: 'hidden',
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
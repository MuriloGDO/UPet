import React from "react"
import { ImageBackground, View, StyleSheet, Text, Image } from "react-native"

export const PhotoCard = (props: {image?:string}) =>{
    return (
        
          <View style={[styles.content,{width:300, marginRight:30}]}>
            <ImageBackground
                source={props.image ? { uri: `data:image/jpeg;base64,${props.image}` } : require('../../assets/golden.jpg.webp')}
                style={styles.background}
                >
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
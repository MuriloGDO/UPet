import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

export const ChatCard = (props: { name?: string; image?: string, petName?:string, adotado?: boolean }) => {
  return (
    <View style={styles.cardStyle}>
      <Image
        style={{ width: 120, height: 120 }}
        source={props.image ? { uri: `data:image/jpeg;base64,${props.image}` } : require("../../assets/user_not_found.jpeg")}
      />
      <View style={{display:"flex", flexDirection:'column'}}>
        <Text style={styles.textStyle}>{props.name}</Text>
        {props.petName
        ?
        <Text style={styles.petTextStyle}>Pet: {props.petName}</Text>
        :
        undefined  
        }
        {props.adotado?
        <Text style={[styles.petTextStyle, {color:'green'}]}>Pet Adotado!</Text>
        :
        undefined
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    height: 120,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
    marginBottom:30
  },
  textStyle: {
    fontSize: 20,
    marginLeft: 20, 
    alignSelf: "center",
  },
  petTextStyle: {
    fontSize: 15,
    marginLeft: 20, 
    alignSelf: "center",
  },
});

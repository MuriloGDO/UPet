import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

export const InstitutionPetCard = (props: { name?: string; image?: string, adotado?: boolean }) => {
  return (
    <View style={styles.cardStyle}>
      <Image
        style={{ width: 120, height: 120 }}
        source={props.image ? { uri: `data:image/jpeg;base64,${props.image}` } : require("../../assets/golden.jpg.webp")}
      />
      <Text style={styles.textStyle}>{props.name}</Text>
      {
        props.adotado
        ?
        <Text style={[styles.textStyle, {color:'green', fontSize:15}]}>Pet Adotado</Text>
        :
        undefined
      }
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
    marginBottom:15
  },
  textStyle: {
    fontSize: 20,
    marginLeft: 20, 
    alignSelf: "center",
  },
});

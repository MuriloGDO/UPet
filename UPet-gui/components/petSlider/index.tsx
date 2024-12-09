import React from "react"
import { ScrollView } from "react-native"
import { PetCard } from "../petCard"

export const PetSlider =() => {
    return(
        <ScrollView horizontal style={{display:"flex", flexDirection:"row", marginRight:10, marginLeft:10}}>
            <PetCard></PetCard>
            <PetCard></PetCard>
            <PetCard></PetCard>
            <PetCard></PetCard>
            <PetCard></PetCard>
            <PetCard></PetCard>
        </ScrollView>
    )
}
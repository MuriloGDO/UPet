import React from "react"
import { ScrollView } from "react-native"
import { PetCard } from "../petCard"
import { MatchingPet } from "../../app/utils/petsResponseInterface"

export const PetSlider = (props: {pets: MatchingPet[]}) => {
    return(
        <ScrollView horizontal style={{display:"flex", flexDirection:"row", marginRight:10, marginLeft:10}}>
                {props.pets.map((pet) => (
                    <PetCard key={pet.id} name={pet.name} percentage={pet.percentage} image={pet.photos[0]? pet.photos[0].photo:undefined}/>
                  )) }
        </ScrollView>
    )
}
import React from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { PetCard } from "../petCard"
import { MatchingPet } from "../../app/utils/ResponsesInterface"
import { useRouter } from "expo-router"

export const PetSlider = (props: {pets: MatchingPet[]}) => {
  const router = useRouter()

    return(
        <ScrollView horizontal style={{display:"flex", flexDirection:"row", marginRight:10, marginLeft:10, marginBottom:60}}>
                {props.pets.map((pet) => (
                    <TouchableOpacity
                        key={pet.id}
                        onPress={() => router.push(`/${pet.id}/pet`)}
                    >
                        <PetCard key={pet.id} name={pet.name} percentage={pet.percentage} image={pet.photos[0]? pet.photos[0].photo:undefined}/>
                    </TouchableOpacity>
                  )) }
        </ScrollView>
    )
}
import React from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { PetCard } from "../petCard"
import { MatchingPet } from "../../app/utils/ResponsesInterface"
import { useRouter } from "expo-router"

export const PetSlider = (props: {pets: MatchingPet[], marginBottom?:number}) => {
  const router = useRouter()

    return(
        <ScrollView horizontal style={{display:"flex", flexDirection:"row", marginRight:10, marginLeft:10, marginBottom:props.marginBottom?props.marginBottom:0}}>
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